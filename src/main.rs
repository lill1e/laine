use sqlx::postgres::PgPoolOptions;

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
}
