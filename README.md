# 🏦 Banking System (Microservices + Angular SSR)

A full-stack banking system built with Spring Boot microservices and Angular Universal (SSR), dockerized and ready for production-level deployment.

---

## 🧰 Tech Stack

- **Backend**: Spring Boot (3 microservices)
- **Frontend**: Angular 17 + SSR (Universal)
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **DevOps**: Docker, Docker Compose, Nginx

---

## 🔧 Services

| Service       | Port  | Description                   |
|---------------|-------|-------------------------------|
| Accounts      | 8081  | User, login, accounts         |
| Transactions  | 8082  | Money transfers               |
| Cards         | 8083  | Card operations               |
| Angular Front | 80    | SSR rendered frontend via Nginx |

All services use a **shared `bank_db`**.

---

## 🐳 Docker Setup

### Step 1: Clone the repo  
Make sure you have Docker Desktop installed.

### Step 2: Run

```bash
docker compose up --build

Folder Structure
/Backend
  ├── Accounts/
  ├── Cards/
  ├── Transactions/
  └── docker-compose.yml

/Frontend
  └── banking-app/
      ├── Dockerfile
      └── nginx.conf

🛡️ Security
JWT-based authentication
Roles: ADMIN and USER
BCryptPasswordEncoder used
CORS allowed from Angular app

🔗 API Endpoints (Sample)
POST /User/createUser
POST /User/userLogin
GET /Account/getUserAccounts
POST /Transaction/sendMoney
GET /card/getCardsByAccount/{accountId}

⚙️ Nginx Config (Summary)
Nginx proxies API routes:
location /api/accounts/      → http://accounts:8081/
location /api/transactions/  → http://transactions:8082/
location /api/cards/         → http://cards:8083/

SSR Angular app is served from:
/app/dist/banking-app/browser → /usr/share/nginx/html\

💡 Notable Fixes (Real Issues Faced)
Redis refused connection → fixed profile & host config
Angular SSR build failed → added --configuration production & fixed dist path
MySQL "table not found" → unified DB, created bank_db only
Nginx showed blank → corrected nginx.conf + SSR path
Spring profile issues → set --spring.profiles.active=docker in Dockerfile
Role ENUM error → fixed seed value ('ADMIN') + used @Enumerated(EnumType.STRING)

👤 Admin User (Optional Seeding)
You can insert manually via MySQL:
INSERT INTO user (username, password, role, phone_number)
VALUES ('admin', '$2a$10$abcDEF1234567890hashedPassword', 'ADMIN', '9999999999');
Or auto-generate via @PostConstruct on startup.

✅ Completed
 Dockerized backend + frontend
 SSR with Angular Universal
 Shared MySQL database
 Working login + JWT
 Admin & user flow

📦 Future Enhancements
Deploy to Kubernetes
Add monitoring (Prometheus + Grafana)
Postgres option
Admin dashboard

👋 Final Note
This project is built from scratch with full understanding of the stack — no tutorials, no templates.
If you're reviewing this repo — yes, I can explain every single file here.
