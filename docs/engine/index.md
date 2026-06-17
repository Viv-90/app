# Wow Engine

Rust-based cross-chain routing and fiat orchestration engine.

---

## Responsibilities

- Cross-chain token routing
- Bridge aggregation (CCTP, deBridge)
- Optimal path selection
- Stellar anchor integration (SEP-24, SEP-38)

---

## API

| Method | Endpoint                        | Description                  |
|--------|---------------------------------|------------------------------|
| GET    | `/api/v1/health`                | Health check                 |
| POST   | `/api/v1/quote`                 | Get cross-chain quote        |
| POST   | `/api/v1/anchor/deposit`        | Initiate anchor deposit      |
| POST   | `/api/v1/anchor/withdraw`       | Initiate anchor withdrawal   |
| POST   | `/api/v1/anchor/quote`          | Get anchor quote             |

---

## Runtime

- **Language**: Rust
- **Async Runtime**: Tokio
- **Web Framework**: Axum
- **HTTP Client**: Reqwest

**Runs on:**  
`http://127.0.0.1:8080`