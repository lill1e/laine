use std::collections::HashMap;

use axum::{Json, Router, extract::State, http::StatusCode, routing::get};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use crate::router::AppState;

#[derive(Serialize, Deserialize, Debug)]
pub struct Frame {
    pub roll_one: i32,
    pub roll_two: Option<i32>,
    pub split: bool,
    pub extra_roll: Option<i32>,
}

#[derive(Serialize, FromRow, Debug)]
pub struct Entry {
    pub game_id: i32,
    pub game_date: NaiveDate,
    pub entry_id: i32,
    pub player: String,
    pub alias: Option<String>,
    pub frames: sqlx::types::Json<Vec<Frame>>,
}

#[derive(Serialize, Debug)]
pub struct Game {
    pub id: i32,
    pub date: NaiveDate,
}

#[derive(Serialize, Debug)]
pub struct GameEntry {
    pub entry_id: i32,
    pub player: String,
    pub alias: Option<String>,
    pub frames: Vec<Frame>,
}

#[derive(Serialize, Debug)]
pub struct GameData {
    pub date: NaiveDate,
    pub entries: Vec<GameEntry>,
}

pub fn router() -> Router<AppState> {
    Router::new().route("/all", get(get_games))
}

// async fn get_games(State(state): State<AppState>) -> Result<Json<Vec<Entry>>, StatusCode> {
async fn get_games(
    State(state): State<AppState>,
) -> Result<Json<HashMap<i32, GameData>>, StatusCode> {
    let mut games_map: HashMap<i32, GameData> = sqlx::query_as!(Game, "select * from game;")
        .fetch_all(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .iter()
        .map(|game| {
            (
                game.id,
                GameData {
                    date: game.date,
                    entries: Vec::new(),
                },
            )
        })
        .collect();
    let all_entries = sqlx::query_as!(Entry,
        r#"
        select g.id as game_id, g.date as game_date, e.id as entry_id, e.player, e.alias,
               json_agg(json_build_object('roll_one', roll_one, 'roll_two', roll_two, 'split', split, 'extra_roll', extra_roll) order by f.frame_number) as "frames!: sqlx::types::Json<Vec<Frame>>"
        from game g
        join entry e on g.id = e.game
        join frame f on e.id = f.entry
        group by g.id, g.date, e.id, e.player, e.alias
        "#).fetch_all(&state.db).await.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    for entry in all_entries {
        games_map
            .get_mut(&entry.game_id)
            .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?
            .entries
            .push(GameEntry {
                entry_id: entry.entry_id,
                player: entry.player,
                alias: entry.alias,
                frames: entry.frames.0,
            });
    }
    Ok(Json(games_map))
}
