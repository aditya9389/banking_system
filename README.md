🏦 Banking System (Microservices + Angular SSR)

A full-stack banking system built using Spring Boot microservices and Angular Universal (SSR).
The app runs in three modes: Local, Docker, and Kubernetes, depending on the active Spring profile.

🧰 Tech Stack

Backend

Spring Boot (Accounts, Transactions, Cards)

Spring Security + JWT

MySQL

Maven

Frontend

Angular 17

Angular Universal (SSR)

DevOps

Docker, Docker Compose

Kubernetes (optional deployment)

Prometheus + Grafana (optional monitoring)

🚀 Running the Project Locally (WITHOUT Docker)

This is how a new contributor should run the system the first time.

1. Install Required Tools

Java (17+)

Maven

Angular CLI

Node.js

MySQL Server + Workbench (or any client)

2. Create the Database

Open MySQL and create the required database:

CREATE DATABASE bank_db;

3. Configure MySQL Credentials

Inside each microservice, the default application.yml is used for local mode (no profile set).

Check the datasource section and update username/password if needed:

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/bank_db
    username: root
    password: your_password_here

4. Run Backend Services Individually

From each service folder:

mvn spring-boot:run


Services will start on:

Accounts → 8081

Transactions → 8082

Cards → 8083

5. Run the Angular SSR App

Inside /Frontend/banking-app:

npm install
npm run build:ssr
npm run serve:ssr


This serves the SSR frontend on http://localhost:4200
.

🎛 Spring Profiles Explained

The backend uses three profiles:

✔ 1. default (local)

Active when you don’t specify any profile

Uses your local MySQL

Requires you to create bank_db manually

Ideal for development, debugging, PR testing

✔ 2. docker

Automatically activated from Dockerfile or docker-compose

Uses service names like mysql:3306 instead of localhost

No manual DB creation needed (init scripts auto-run if enabled)

✔ 3. kubernetes

Selected by Kubernetes manifests

Points MySQL host to the Kubernetes service name

Works with ConfigMaps/Secrets

You don’t need to change these manually.
Each environment selects the correct profile automatically.

🐳 Running With Docker

If someone wants everything to run automatically:

docker compose up --build


This starts:

All backend microservices

MySQL container

Angular SSR build

Nginx reverse proxy

Prometheus + Grafana (if enabled)

☸ Running on Kubernetes

If someone wants to test deployment:

kubectl apply -f kubernetes/


Kubernetes selects the kubernetes Spring profile automatically.

📁 Project Structure (Simplified)
/Backend
   ├── Accounts/
   ├── Cards/
   ├── Transactions/
   └── docker-compose.yml

/Frontend
   └── banking-app/
        ├── Dockerfile
        └── nginx.conf

/Kubernetes
   ├── deployments/
   ├── services/
   └── monitoring/

🔗 Sample API Endpoints
POST /User/createUser
POST /User/userLogin
GET  /Account/getUserAccounts
POST /Transaction/sendMoney
GET  /card/getCardsByAccount/{accountId}

🔧 Fixes Implemented

Real development issues solved:

Angular SSR build path fixed

MySQL table not found → unified schema

Nginx blank screen → corrected SSR paths

Spring profile mismatch → clearly separated profiles

ENUM role issues → fixed with EnumType.STRING

Kubernetes manifests corrected

Grafana dashboards created

👤 Optional Admin Seed
INSERT INTO user (username, password, role, phone_number)
VALUES ('admin', '$2a$10$someHashValue', 'ADMIN', '9999999999');

🤝 Want to Contribute?

Open to collaboration for:

Adding Playwright/Cypress test suites

Improving frontend visual layout

Extending API features

Hardening Kubernetes setup

Pull requests and issues are welcome.
