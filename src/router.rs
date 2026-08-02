use axum::Router;

use crate::routes::{games, users};

#[derive(Clone)]
pub struct AppState {
    pub db: sqlx::PgPool,
}

pub fn app(state: AppState) -> Router {
    Router::new()
        .nest("/games", games::router())
        .nest("/users", users::router())
        .with_state(state)
}
