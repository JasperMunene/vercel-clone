# Vercel‑Clone on AWS
![UI](https://res.cloudinary.com/dwcvogqak/image/upload/fl_preserve_transparency/v1748372869/Screenshot_from_2025-05-27_22-06-31_przwy6.jpg?_s=public-apps)
A self‑hosted Vercel‑style deployment pipeline built with Node.js, AWS Fargate, Kafka, ClickHouse, and S3. Push your code to Git, trigger a build on demand, stream real‑time logs, and serve the static output via custom subdomains.

---

## 🚀 Features
- Project Management: Create new projects with random slug subdomains.

- On‑Demand Builds: Trigger builds via REST endpoint; runs isolated in AWS Fargate.

- Real‑Time Logs: Stream build logs through Kafka → ClickHouse → Socket.io.

- Artifact Storage: Upload dist/ artifacts to S3 under __outputs/<PROJECT_ID>/….

- Custom Subdomains: Serve builds from S3 via an Express reverse proxy based on <slug>.yourdomain.com.

---

## 🛠️ Tech Stack

| **Component**       | **Technology**                   |
|---------------------|----------------------------------|
| API Server          | Node.js, Express, Zod, Prisma    |
| Build Runner        | Node.js, Docker, npm             |
| Queue & Logs        | AWS Fargate, KafkaJS, ClickHouse |
| Real‑Time Streaming | Socket.io                        |
| Artifact Hosting    | AWS S3, http‑proxy               |
| CI/CD               | GitHub Actions, Docker Hub       |
| Frontend            | Nextjs, Tailwindcss              |


## Setup Guide

This Project contains the following services and folders:

- `api-server`: REST API and Kafka consumer for scheduling builds and streaming logs.
- `build-server`: Dockerized build container that installs, builds, and uploads artifacts.
- `s3-reverse-proxy`: Express proxy to map subdomains to S3-hosted static assets.

## Prerequisites

- Node.js v18 or later
- Docker and Docker Compose
- AWS account with ECS, ECR, S3, and IAM permissions.
- Kafka cluster (SSL + SASL) and ClickHouse instance.
- DNS-configured custom domain for subdomains

## Installation
1. Clone the repository:
```markdown
git clone https://github.com/JasperMunene/vercel-clone.git
cd vercel-clone
```
2. Install dependencies for each service:
```markdown
cd api-server && npm install
cd ../build-server && npm install
cd ../s3-reverse-proxy && npm install
```
3. Build and push the build-server image to ECR:
```markdown
docker build -t your-ecr-repo/build-server:latest ./build-server
docker push your-ecr-repo/build-server:latest
```
4. Copy and configure environment variables in each service folder



At this point following services would be up and running:

| S.No | Service            | PORT    |
|------|--------------------|---------|
| 1    | `api-server`       | `:9000` |
| 2    | `socket.io-server` | `:9002` |
| 3    | `s3-reverse-proxy` | `:8000` |
| 4    | `Frontend`         | `:3000` |


### Architecture [Whiteboard Diagram](https://app.eraser.io/workspace/iKhB57YARYBWzPJYPCoy?origin=share)

![Vercel Clone Architecture](https://res.cloudinary.com/dwcvogqak/image/upload/fl_preserve_transparency/v1748347056/Screenshot_from_2025-05-27_14-57-21_zb7c0a.jpg?_s=public-apps)


### 🤝 Contributing

1. **Fork** the repository.
2. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature
3. **Commit your changes and push**:
   ```bash
   git push origin feat/your-feature
4. **Open a Pull Request and describe your changes.**


### 📄 License
This project is licensed under the MIT License. See [LICENSE](LICENCE) for details.


