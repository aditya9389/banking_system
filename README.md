# 🏦 Banking System (Microservices + Angular SSR)

A full-stack banking system built with Spring Boot microservices and Angular Universal (SSR).
Designed with a **Docker-first workflow**, optional Kubernetes deployment, and **deterministic automated testing**.

---

## 🧰 Tech Stack

* **Backend**: Spring Boot (Accounts, Transactions, Cards)
* **Frontend**: Angular 17 + SSR (Universal)
* **Database**: MySQL
* **Security**: Spring Security + JWT
* **DevOps**: Docker, Docker Compose, Kubernetes
* **Observability**: Prometheus, Grafana
* **Testing**: Playwright (API + UI)

---

## 🔧 Services

| Service       | Port (Docker / CI) | Description           |
| ------------- | ------------------ | --------------------- |
| Accounts      | 8081               | Users, auth, accounts |
| Transactions  | 8082               | Money transactions    |
| Cards         | 8083               | Card management       |
| Angular Front | 4200               | Angular SSR frontend  |

All services use a shared **`bank_db`**.

---

## 🏗️ Architecture Overview

### Docker (Primary Runtime)

* Services run as containers
* Ports are **explicitly exposed**
* Services accessible via:

  * `localhost:<port>` (host / CI / Playwright)
  * `service-name:<port>` (container-to-container)
* Used by:

  * Local development
  * CI pipelines
  * All automated tests

### Kubernetes (Deployment Target)

* Services are **not exposed by default**
* Access only via **Ingress / Gateway**
* No direct `localhost:<port>` access
* Currently used for deployment and infra validation only

> **Note**: Automated tests are not executed against Kubernetes.

---

## 👤 Default Users (Auto-Seeding Enabled)

On application startup, backend auto-seeding ensures baseline users for development, QA, and testing.

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
```

### Notes

* Passwords stored using **BCrypt**
* Seeding is **idempotent**
* Enabled in **default** and **docker** profiles
* Disabled in **kubernetes** profile
* Table: `users`
* Accounts, cards, and transactions are **not seeded**

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
```

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
| **kubernetes** | application-kubernetes.yml | Kubernetes runtime |

---

## 🐳 Docker Setup

```bash
docker compose up --build
```

---

## 🧪 Testing Strategy

### API Tests (Playwright)

* Implemented using **Playwright APIRequestContext**
* No browser installation required
* Docker-based execution
* Fully deterministic:

  * Tests create required users/accounts/cards explicitly
  * No reliance on pre-existing DB state
* Executed in CI (post-merge)

Folder structure:

```
src/tests/api/
 ├── core/        # auth, api client, env
 ├── accounts/
 ├── transfer/
 ├── cards/
 └── transactions/
```

### UI Tests (Playwright)

#### E2E Tests (Post-merge)

* Critical user flows
* No data creation
* Fast validation

Examples:

* Admin login
* User login
* Core navigation
* Logout

#### UI Regression Tests (Pre-merge)

* Deeper UI coverage
* Data creation allowed
* Fully self-contained

Examples:

* Admin create user
* Admin create account
* Manage cards
* User money transfer

Folder structure:

```
src/tests/ui/
 ├── e2e/
 ├── regression/
 └── pages/
```

---

## 🔗 API Endpoints (Current)

### Auth & Users (Accounts Service)

```
POST   /User/userLogin
POST   /User/createUser        (ADMIN)
GET    /User/getUsers          (ADMIN)
GET    /User/getUser/{username}
DELETE /User/deleteUser/{username} (ADMIN)
```

### Accounts

```
POST   /Account/createAccount          (ADMIN)
GET    /Account/getMyAccounts
GET    /Account/getUserAccounts/{username} (ADMIN)
GET    /Account/getMyAccountBalance/{accountId}
GET    /Account/getUserAccountBalance/{accountId} (ADMIN)
POST   /Account/transferFunds
DELETE /Account/deleteAccount/{accountId} (ADMIN)
```

### Cards

```
POST   /card/createCard
GET    /card/getCardsByUsername/{username}
GET    /card/getCardsByAccount/{accountId}
PUT    /card/deactivateCard/{cardId}
DELETE /card/deleteAllCards/{accountId}
```

### Transactions

```
GET    /transactions/from/{accountId}
GET    /transactions/to/{accountId}
GET    /transactions/getTransactionHistory/{accountId}
POST   /transactions/saveTransaction
```

---

## ⚙️ Nginx (Docker SSR)

```
/api/accounts/      → http://accounts:8081/
/api/transactions/ → http://transactions:8082/
/api/cards/        → http://cards:8083/
```

SSR served from:

```
/usr/share/nginx/html
```

---

## ☸️ Kubernetes

Manifests:

```
/k8/
```

Deploy:

```bash
kubectl apply -f k8/
```

### Notes

* Kubernetes currently has **no automated tests**
* API and UI tests target **Docker runtime only**
* Kubernetes is used for deployment and infra validation

---

## ✅ Completed

* Angular SSR + Spring Boot microservices
* Shared MySQL database
* Docker-first CI workflow
* JWT authentication (ADMIN + USER)
* Accounts, cards, transactions flow
* Prometheus + Grafana monitoring
* Deterministic backend seeding
* Playwright API testing
* Playwright UI E2E & regression testing

---

## 📦 Future Work

### Priority Roadmap

| Priority | Task | Impact | Status |
|----------|------|--------|--------|
| 🔴 NOW | Remove hardcoded DB password | Security breach prevention | ⏳ Planned |
| 🔴 NOW | Add `.env` file pattern | Deployment flexibility | ⏳ Planned |
| 🟡 SOON | Add SSR build scripts | Frontend completeness | ⏳ Planned |
| 🟡 SOON | Multi-stage Docker builds | Reduce image size 60-70% | ⏳ Planned |
| 🟡 SOON | Health checks | Production readiness | ⏳ Planned |
| 🟢 LATER | Swagger/OpenAPI | Better DX | ⏳ Planned |

---

### 🔴 Critical: Security & Configuration

#### Remove Hardcoded Credentials
* **Why**: Credentials exposed in public GitHub repo = security breach risk
* **Current Issue**: `docker-compose.yml` contains `MYSQL_ROOT_PASSWORD: Adii@9389`
* **Solution**: Use `.env` file with environment variables
* **Example**:
  ```yaml
  # docker-compose.yml (updated)
  environment:
    MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    MYSQL_DATABASE: ${DB_NAME}
  ```

#### Add `.env` File Pattern
* **Why**: Different environments need different configurations
* **Create** `.env.example`:
  ```env
  # Database
  DB_ROOT_PASSWORD=change_me_in_production
  DB_NAME=bank_db
  
  # JWT
  JWT_SECRET=your_jwt_secret_key_here
  
  # API Configuration
  API_BASE_URL=http://localhost:4200
  SPRING_PROFILES_ACTIVE=docker
  ```
* **Usage**: `docker compose --env-file .env up`

---

### 🟡 High Priority: Production Readiness

#### Add SSR Build Scripts
* **Why**: Complete Angular Universal implementation
* **Impact**: Better SEO, faster first-page load, server-side rendering
* **Add to** `Frontend/banking-app/package.json`:
  ```json
  {
    "scripts": {
      "build": "ng build --configuration production",
      "build:ssr": "ng build && ng run banking-app:server",
      "dev:ssr": "ng serve --open",
      "serve:ssr": "node dist/banking-app/server/main.js",
      "test": "ng test",
      "lint": "ng lint"
    }
  }
  ```

#### Multi-Stage Docker Builds
* **Why**: Reduce image size, faster CI/CD pipelines
* **Impact**: 60-70% smaller images, quicker deployments
* **Example for** `Backend/Accounts/Dockerfile`:
  ```dockerfile
  # Stage 1: Build
  FROM maven:3.9-eclipse-temurin-17 AS builder
  WORKDIR /app
  COPY . .
  RUN mvn clean package -DskipTests
  
  # Stage 2: Runtime
  FROM eclipse-temurin:17-jre-alpine
  WORKDIR /app
  COPY --from=builder /app/target/accounts.jar app.jar
  EXPOSE 8081
  ENTRYPOINT ["java", "-jar", "app.jar"]
  ```
* **Apply to**: All backend services (Accounts, Cards, Transactions)

#### Health Checks for Services
* **Why**: Better orchestration and deployment reliability
* **Add to** `docker-compose.yml`:
  ```yaml
  services:
    accounts:
      healthcheck:
        test: ["CMD", "curl", "-f", "http://localhost:8081/actuator/health"]
        interval: 30s
        timeout: 10s
        retries: 3
        start_period: 40s
    
    transactions:
      healthcheck:
        test: ["CMD", "curl", "-f", "http://localhost:8082/actuator/health"]
        interval: 30s
        timeout: 10s
        retries: 3
    
    cards:
      healthcheck:
        test: ["CMD", "curl", "-f", "http://localhost:8083/actuator/health"]
        interval: 30s
        timeout: 10s
        retries: 3
  ```

---

### 🟢 Enhancement: Developer Experience

#### Swagger/OpenAPI Documentation
* **Why**: Interactive API docs, live testing, no guessing
* **Impact**: Faster onboarding, better developer experience, automatic schema validation
* **Add to all** `pom.xml` files (Accounts, Cards, Transactions):
  ```xml
  <dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
  </dependency>
  ```
* **Access**:
  ```
  http://localhost:8081/swagger-ui.html  → Accounts Service
  http://localhost:8082/swagger-ui.html  → Transactions Service
  http://localhost:8083/swagger-ui.html  → Cards Service
  ```
* **Annotations Example**:
  ```java
  @PostMapping("/userLogin")
  @Operation(summary = "User Login", description = "Authenticate user with credentials")
  @ApiResponse(responseCode = "200", description = "Login successful")
  @ApiResponse(responseCode = "401", description = "Invalid credentials")
  public ResponseEntity<AuthResponse> userLogin(@RequestBody LoginCred loginCred) {
    return ResponseEntity.ok(userServices.userLogin(loginCred));
  }
  ```
* **Benefits**:
  - ✅ Auto-generated, always in sync with code
  - ✅ Live endpoint testing without Postman
  - ✅ Example requests/responses
  - ✅ Error code documentation
  - ✅ JWT authentication support

---

### 🔹 Negative Testing

* API negative scenarios:

  * 401 / 403 authorization checks
  * Invalid payloads
  * Insufficient balance transfers
* UI negative flows:

  * Validation errors
  * Unauthorized access
  * Edge-case handling

### 🔹 UI Improvements

* Admin dashboard layout cleanup
* Consistent navigation & feedback
* Replace emoji-only buttons with accessible icons
* Loading states & skeletons
* Improved form validation
* Better table UX (pagination, sorting)
* Separate admin vs user themes
* Improved SSR hydration stability
* Mobile responsiveness

### 🔹 Backend Improvements

* Standardized API responses
* Global error handling
* Audit logging for transactions
* DB index optimization
* Rate limiting & security hardening

---

## 🤝 Contribute

Open to collaboration on:

* Playwright API & UI testing
* UI/UX improvements
* Backend refactoring
* Observability enhancements
* Security hardening
* API documentation (Swagger/OpenAPI)

Fork the repo, raise issues, and submit PRs.
