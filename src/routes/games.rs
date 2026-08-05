use std::collections::HashMap;

use anyhow::{Result, anyhow};
use axum::{
    Json, Router,
    extract::{Path, State},
    http::StatusCode,
    routing::{get, post},
};
use chrono::NaiveDate;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

use crate::router::AppState;

#[derive(Serialize, Deserialize, Debug)]
pub struct Frame {
    pub id: i32,
    pub roll_one: i16,
    pub roll_two: Option<i16>,
    pub split: bool,
    pub extra_roll: Option<i16>,
}

#[derive(Serialize, FromRow, Debug)]
pub struct Entry {
    pub game_id: i32,
    pub game_date: NaiveDate,
    pub entry_id: i32,
    pub player: String,
    pub alias: Option<String>,
    pub username: String,
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
    pub username: String,
    pub frames: Vec<Frame>,
}

#[derive(Serialize, Debug)]
pub struct GameData {
    pub date: NaiveDate,
    pub entries: Vec<GameEntry>,
}

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/all", get(get_games))
        .route("/date/{date}", get(get_games_by_date))
        .route("/", post(add_game))
        .route("/{game_id}/entry", post(add_entry))
}

async fn get_game_entries(games: Vec<Game>, entries: Vec<Entry>) -> Result<HashMap<i32, GameData>> {
    let mut games_map: HashMap<i32, GameData> = games
        .into_iter()
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

    for entry in entries {
        games_map
            .get_mut(&entry.game_id)
            .ok_or(anyhow!(StatusCode::INTERNAL_SERVER_ERROR))?
            .entries
            .push(GameEntry {
                entry_id: entry.entry_id,
                player: entry.player,
                alias: entry.alias,
                username: entry.username,
                frames: entry.frames.0,
            });
    }

    Ok(games_map)
}

async fn get_games(
    State(state): State<AppState>,
) -> Result<Json<HashMap<i32, GameData>>, StatusCode> {
    Ok(Json(get_game_entries(
        sqlx::query_as!(Game, "select * from game;")
            .fetch_all(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
        sqlx::query_as!(Entry,
        r#"
        select g.id as game_id, g.date as game_date, e.id as entry_id, e.player, e.alias, u.username,
               json_agg(json_build_object('id', f.id, 'roll_one', roll_one, 'roll_two', roll_two, 'split', split, 'extra_roll', extra_roll) order by f.frame_number) as "frames!: sqlx::types::Json<Vec<Frame>>"
        from game g
        join entry e on g.id = e.game
        join users u on u.id = e.player
        join frame f on e.id = f.entry
        group by g.id, g.date, e.id, e.player, e.alias, u.username
        "#).fetch_all(&state.db).await.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
    ).await.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?))
}

async fn get_games_by_date(
    State(state): State<AppState>,
    Path(date): Path<NaiveDate>,
) -> Result<Json<HashMap<i32, GameData>>, StatusCode> {
    Ok(Json(get_game_entries(
        sqlx::query_as!(Game, "select * from game where date = $1;", date)
            .fetch_all(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
        sqlx::query_as!(Entry,
        r#"
        select g.id as game_id, g.date as game_date, e.id as entry_id, e.player, e.alias, u.username,
               json_agg(json_build_object('id', f.id, 'roll_one', roll_one, 'roll_two', roll_two, 'split', split, 'extra_roll', extra_roll) order by f.frame_number) as "frames!: sqlx::types::Json<Vec<Frame>>"
        from game g
        join entry e on g.id = e.game
        join users u on u.id = e.player
        join frame f on e.id = f.entry
        where g.date = $1
        group by g.id, g.date, e.id, e.player, e.alias, u.username
        "#, date).fetch_all(&state.db).await.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
    ).await.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?))
}

#[derive(Serialize, Deserialize, Debug)]
struct GameBody {
    date: NaiveDate,
}

#[derive(Serialize, Deserialize, Debug)]
struct EntryFrame {
    pub roll_one: i16,
    pub roll_two: Option<i16>,
    pub split: bool,
    pub extra_roll: Option<i16>,
}

#[derive(Serialize, Deserialize, Debug)]
struct EntryBody {
    player: String,
    alias: Option<String>,
    frames: Vec<EntryFrame>,
}

#[derive(Serialize, Deserialize, Debug)]
struct EntryDBResult {
    id: i32,
    game: i32,
    player: String,
    alias: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct EntryResult {
    id: i32,
    game: i32,
    player: String,
    alias: Option<String>,
    frames: Vec<Frame>,
}

async fn add_game(
    State(state): State<AppState>,
    Json(req): Json<GameBody>,
) -> Result<Json<Game>, StatusCode> {
    Ok(Json(
        sqlx::query_as!(
            Game,
            "insert into game(date) values($1) returning *",
            req.date
        )
        .fetch_one(&state.db)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
    ))
}

async fn add_entry(
    State(state): State<AppState>,
    Path(game): Path<i32>,
    Json(req): Json<EntryBody>,
) -> Result<Json<EntryResult>, StatusCode> {
    if req.frames.len() != 10 {
        Err(StatusCode::BAD_REQUEST)
    } else {
        let entry = sqlx::query_as!(
            EntryDBResult,
            "insert into entry(game, player, alias) values($1, $2, $3) returning *",
            game,
            req.player,
            req.alias
        )
        .fetch_one(&state.db)
        .await
        .map_err(|_| StatusCode::NOT_FOUND)?;
        let mut frame_counter = 1;
        let mut frames: Vec<Frame> = Vec::new();
        for frame in req.frames {
            let new_frame = sqlx::query_as!(
                Frame,
                "insert into frame(entry, roll_one, roll_two, split, extra_roll, frame_number) values($1, $2, $3, $4, $5, $6) returning id, roll_one, roll_two, split, extra_roll", entry.id, frame.roll_one, frame.roll_two, frame.split, frame.extra_roll, frame_counter
            ).fetch_one(&state.db).await.map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
            frames.push(new_frame);
            frame_counter += 1;
        }
        Ok(Json(EntryResult {
            id: entry.id,
            game: entry.game,
            player: entry.player,
            alias: entry.alias,
            frames: frames,
        }))
    }
}
