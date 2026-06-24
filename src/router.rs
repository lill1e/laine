use axum::Router;

#[derive(Clone)]
pub struct AppState {
    pub db: sqlx::PgPool,
}

pub fn app(state: AppState) -> Router {
    Router::new()
        .with_state(state)
}
