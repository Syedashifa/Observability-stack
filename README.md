# Full-Stack Observability Pipeline (Node.js, Prometheus, Grafana, Docker)

A production-style observability and monitoring stack deployed on AWS EC2 to capture and visualize the Golden Signals of API performance.

## Architecture
- **Application:** Node.js Express service instrumented with `prom-client` to expose real-time metrics at `/metrics`.
- **Metrics Collection:** Prometheus configured with a 5-second scrape interval.
- **Visualization:** Grafana dashboard monitoring traffic volume, route-level latency, and HTTP 500 error rates.
- **Infrastructure:** Docker & Docker Compose on an AWS EC2 instance (`Ubuntu`).

## Monitored Endpoints
- `GET /` — Standard baseline route.
- `GET /slow` — Simulates latency spikes (3-second delay).
- `GET /error` — Simulates backend failure (HTTP 500 status code).
- `GET /metrics` — Prometheus metrics export endpoint.

## Quickstart (Local / Cloud)

1. Clone the repository:
   ```bash
   git clone [https://github.com/Syedashifa/Observability-stack.git](https://github.com/Syedashifa/Observability-stack.git)
   cd Observability-stack
