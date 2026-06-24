use axum::{Json, Router, extract::State, http::StatusCode, routing::get};
use serde::Serialize;

use crate::router::AppState;

#[derive(Serialize)]
pub struct Game {
    pub id: u64,
}

pub fn router() -> Router<AppState> {
    Router::new().route("/all", get(get_games))
}

async fn get_games(State(state): State<AppState>) -> Result<Json<Vec<Game>>, StatusCode> {
    Err(StatusCode::NOT_IMPLEMENTED)
}
