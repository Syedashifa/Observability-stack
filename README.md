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

### 1. Clone the repository
```bash
git clone [https://github.com/Syedashifa/Observability-stack.git](https://github.com/Syedashifa/Observability-stack.git)
cd Observability-stack
2. Start the stack
Bash
docker compose up -d
3. Access the services
Node.js App: http://localhost:3000

Prometheus UI: http://localhost:9090

Grafana Dashboard: http://localhost:3001 (Default login: admin / admin)

(If running on AWS EC2, replace localhost with your EC2 Public IP address).

4. Import the Dashboard
Open Grafana at http://localhost:3001.

Navigate to Dashboards > New > Import.

Upload the dashboard.json file included in this repository.

Select your Prometheus data source and click Import.

Synthetic Traffic Simulation
To generate live traffic and test latency/error visualization on Grafana:

Bash
while true; do
  curl -s http://localhost:3000/ > /dev/null
  curl -s http://localhost:3000/slow > /dev/null
  curl -s http://localhost:3000/error > /dev/null
  sleep 1
done
