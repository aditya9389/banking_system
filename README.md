# 🏦 Banking System (Microservices + Angular SSR)

A full-stack banking system built with Spring Boot microservices and Angular Universal (SSR). Supports local development, Docker deployment, and Kubernetes.

---

## 🧰 Tech Stack

* **Backend**: Spring Boot (Accounts, Transactions, Cards)
* **Frontend**: Angular 17 + SSR (Universal)
* **Database**: MySQL
* **Security**: Spring Security + JWT
* **DevOps**: Docker, Docker Compose, Kubernetes, Grafana, Prometheus

---

## 🔧 Services

| Service       | Port                       | Description                        |
| ------------- | -------------------------- | ---------------------------------- |
| Accounts      | 8081                       | User login, registration, accounts |
| Transactions  | 8082                       | Money transfers                    |
| Cards         | 8083                       | Card operations                    |
| Angular Front | 4200 (local) / 80 (docker) | SSR frontend                       |

All services use a **shared `bank_db`**.

---

## ▶️ Run Locally (Without Docker)

### Requirements

* Java 17+
* Maven
* Node 18+
* Angular CLI
* MySQL Server

### 1. Create database

```
CREATE DATABASE bank_db;
```

### 2. Configure MySQL credentials

## 👤 Default Admin User (Auto-Seeding Enabled)

On application startup, a default **ADMIN** user is automatically created by the backend seeder (no manual SQL required).

**Default Admin Credentials:**

```
Username: admin
Password: admin123
```

**Notes:**

* Password is stored using **BCrypt encryption**
* Seeding runs only when the `users` table is empty
* Table name used: `users` (not `user` chnaged it recently)
* Seeding is intended for **development only**

Update in each service:

```
Backend/.../application.yml
```

(Default profile is used for local dev.)

### 3. Start backend

```
mvn spring-boot:run
```

### 4. Start Angular frontend

```
cd Frontend/banking-app
npm install
ng serve
```

For SSR:

```
npm run dev:ssr
```

---

## 🧩 Profiles

| Profile        | File                       | Purpose                             |
| -------------- | -------------------------- | ----------------------------------- |
| **default**    | application.yml            | Local development, uses local MySQL |
| **docker**     | application-docker.yml     | Enabled automatically in Docker     |
| **kubernetes** | application-kubernetes.yml | Used inside Kubernetes cluster      |

No manual switch needed during Docker/K8s runs.

---

## 🐳 Docker Setup

### 1. Clone repo

Install Docker Desktop.

### 2. Run

```
docker compose up --build
```

### Folder Structure

```
/Backend
   ├── Accounts/
   ├── Cards/
   ├── Transactions/
   └── docker-compose.yml

/Frontend
   └── banking-app/
        ├── Dockerfile
        └── nginx.conf
```

---

## 🔗 API Endpoints (Sample)

```
POST /User/createUser
POST /User/userLogin
GET  /Account/getUserAccounts
POST /Transaction/sendMoney
GET  /card/getCardsByAccount/{accountId}
```

---

## ⚙️ Nginx (Docker SSR Summary)

```
location /api/accounts/      → http://accounts:8081/
location /api/transactions/  → http://transactions:8082/
location /api/cards/         → http://cards:8083/
```

SSR served from:

```
/usr/share/nginx/html
```

---

## ☸️ Kubernetes Setup

K8s manifests stored in:

```
/kubernetes/
```

Includes:

* Deployments
* Services
* ConfigMaps
* Secrets
* Ingress
* Monitoring (Prometheus + Grafana)

Deploy all:

```
kubectl apply -f kubernetes/
```

---

## 👤 Admin User (Optional Seeding)

```
INSERT INTO user (username, password, role, phone_number)
VALUES ('admin', '<bcrypt_hash>', 'ADMIN', '9999999999');
```

---

## ✅ Completed

* Angular SSR + microservices
* Shared MySQL
* Dockerized backend and frontend
* Kubernetes manifests
* JWT auth (ADMIN + USER)
* Full account, cards, and transactions flow
* Prometheus + Grafana monitoring

---

## 📦 Future Enhancements

* Better SSR caching
* Admin dashboard
* Optional Postgres support
* More analytics and logs

---

## 🤝 Contribute

Open to collaboration for:

* Playwright/Cypress test coverage
* Improving UI/UX
* Expanding microservice features
* Enhanced monitoring & dashboards

Fork, raise issues, and submit PRs.
