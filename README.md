# 🏦 Banking System (Microservices + Angular SSR)

A full-stack banking system built with Spring Boot microservices and Angular Universal (SSR).  
Supports local development, Docker, Kubernetes, and a layered automated testing strategy.

---

## 🧰 Tech Stack

* **Backend**: Spring Boot (Accounts, Transactions, Cards)
* **Frontend**: Angular 17 + SSR (Universal)
* **Database**: MySQL
* **Security**: Spring Security + JWT
* **DevOps**: Docker, Docker Compose, Kubernetes, Grafana, Prometheus
* **Testing**: Playwright (UI E2E + UI Regression)

---

## 🔧 Services

| Service       | Port                       | Description                        |
| ------------- | -------------------------- | ---------------------------------- |
| Accounts      | 8081                       | Users, login, accounts             |
| Transactions  | 8082                       | Money transfers                    |
| Cards         | 8083                       | Card operations                    |
| Angular Front | 4200 (local) / 80 (docker) | Angular SSR frontend               |

All services use a **shared `bank_db`**.

---

## 👤 Default Users (Auto-Seeding Enabled)

On application startup, backend auto-seeding ensures baseline users are always available for development, QA, and automated testing.

### Seeded Users

**ADMIN**
```

Username: admin
Password: admin123
Role: ADMIN

```

**USER**
```

Username: seed_user
Password: user123
Role: USER

````

### Notes
* Passwords stored using **BCrypt**
* Seeding is **idempotent**
* Runs in **default** and **docker** profiles
* Disabled in **kubernetes** profile
* Table name: `users`
* Intended for **development & QA only**

---

## ▶️ Run Locally (Without Docker)

### Requirements
* Java 17+
* Maven
* Node 18+
* Angular CLI
* MySQL Server

### 1. Create database
```sql
CREATE DATABASE bank_db;
````

### 2. Configure MySQL

Update credentials in:

```
Backend/**/application.yml
```

### 3. Start backend

```bash
mvn spring-boot:run
```

### 4. Start frontend

```bash
cd Frontend/banking-app
npm install
ng serve
```

SSR:

```bash
npm run dev:ssr
```

---

## 🧩 Profiles

| Profile        | File                       | Purpose            |
| -------------- | -------------------------- | ------------------ |
| **default**    | application.yml            | Local development  |
| **docker**     | application-docker.yml     | Docker / CI        |
| **kubernetes** | application-kubernetes.yml | Kubernetes cluster |

---

## 🐳 Docker Setup

```bash
docker compose up --build
```

---

## 🧪 Testing Strategy

### UI Tests (Playwright)

#### E2E Tests (Post-merge QA)

* Critical flows only
* No data creation
* Fast signal

Examples:

* Admin login
* User login
* Core navigation
* Logout

#### UI Regression Tests (Pre-merge QA)

* Deeper UI coverage
* Data creation allowed
* Fully self-contained tests

Examples:

* Admin create user
* Admin create account
* Manage cards
* User transfer funds

Folder structure:

```
src/tests/ui/
 ├── e2e/
 ├── regression/
 └── pages/
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

## ⚙️ Nginx (Docker SSR)

```
location /api/accounts/      → http://accounts:8081/
location /api/transactions/ → http://transactions:8082/
location /api/cards/        → http://cards:8083/
```

SSR served from:

```
/usr/share/nginx/html
```

---

## ☸️ Kubernetes Setup

Manifests in:

```
/k8/
```

Deploy:

```bash
kubectl apply -f k8/
```

---

## ✅ Completed

* Angular SSR + Spring Boot microservices
* Shared MySQL database
* Docker & Kubernetes setup
* JWT authentication (ADMIN + USER)
* Accounts, cards, transactions flow
* Prometheus + Grafana monitoring
* UI E2E and UI Regression testing
* Deterministic backend data seeding

---

## 📦 Future Work

### 🔹 API Testing

* Add API tests for:

  * Auth
  * Users
  * Accounts
  * Cards
  * Transactions
* Cover business rules & negative scenarios
* Integrate API tests into CI (pre-merge)

### 🔹 UI Improvements (Detailed)

* Refactor admin dashboard layout for clarity
* Improve navigation consistency across admin pages
* Replace emoji-only buttons with accessible labels/icons
* Add loading states and skeletons for async operations
* Standardize success and error messages
* Improve form validation with inline feedback
* Improve table UX (empty states, pagination, sorting)
* Separate admin vs user visual themes
* Reduce SSR flicker and improve hydration stability
* Add reusable UI components (buttons, modals, alerts)
* Improve mobile responsiveness

### 🔹 Backend Improvements

* Refactor service boundaries where needed
* Improve error handling and response consistency
* Add audit logging for transactions
* Optimize database indexes and queries
* Strengthen security (rate limiting, audit trails)

---

## 🤝 Contribute

Open to collaboration for:

* Playwright UI testing
* API test coverage
* UI/UX improvements(urjent)
* Backend refactoring
* Observability enhancements

Fork the repo, raise issues, and submit PRs.

```
```
