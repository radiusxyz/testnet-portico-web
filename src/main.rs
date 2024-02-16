use std::net::SocketAddr;

use axum::{
    response::{Html, IntoResponse},
    routing::get,
    Router, Server,
};

#[tokio::main]
async fn main() {
    let address = SocketAddr::from(([0, 0, 0, 0], 8080));
    let app = Router::new().route("/", get(index));
    Server::bind(&address)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn index() -> impl IntoResponse {
    Html::from(include_str!("../static/index.html"))
}
