use axum::{Json, Router, extract::State, http::StatusCode, routing::get};
use serde::{Deserialize, Serialize};

use crate::router::AppState;

#[derive(Serialize, Deserialize)]
struct User {
    id: String,
    username: String,
    elevated: bool,
    avatar: String,
}

pub fn router() -> Router<AppState> {
    Router::new().route("/all", get(get_users))
}

async fn get_users(State(state): State<AppState>) -> Result<Json<Vec<User>>, StatusCode> {
    Ok(Json(
        sqlx::query_as!(User, "select * from users")
            .fetch_all(&state.db)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?,
    ))
}
