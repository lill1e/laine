use sqlx::postgres::PgPoolOptions;
use tokio::net::TcpListener;

use crate::router::AppState;

mod router;
pub mod routes;

#[tokio::main]
async fn main() {
    dotenvy::dotenv().unwrap();
    let pool = PgPoolOptions::new()
        .max_connections(20)
        .connect(
            std::env::var("DATABASE_URL")
                .expect("Missing DATABASE_URL environment url")
                .as_str(),
        )
        .await
        .unwrap();
    sqlx::migrate!().run(&pool).await.unwrap();
    let app = router::app(AppState { db: pool });
    let listener = TcpListener::bind("0.0.0.0:5174")
        .await
        .expect("Failed to bind service to port");
    axum::serve(listener, app)
        .await
        .expect("There was an error serving the app");
}
