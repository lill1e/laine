use axum::Router;

use crate::routes::games;

#[derive(Clone)]
pub struct AppState {
    pub db: sqlx::PgPool,
}

pub fn app(state: AppState) -> Router {
    Router::new()
        .nest("/games", games::router())
        .with_state(state)
}
