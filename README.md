# Microservices-Based Banking System

## Project Overview
This is a microservices-based banking system built using **Spring Boot**. The system is designed to handle authentication, account management, transactions, and card operations using separate microservices. **JWT authentication** is implemented for security, and **Docker & Kubernetes** are used for deployment.

## Features
- **Account Service**: User authentication, account creation, and role-based access.
- **Cards Service**: Manages debit/credit card operations.
- **Transaction Service**: Handles fund transfers and transaction history.
- **API Gateway**: Centralized routing for microservices.
- **Security**: JWT authentication with role-based authorization.
- **Scalability**: Built for deployment with Docker and Kubernetes.

## Tech Stack
- **Backend**: Java (Spring Boot)
- **Database**: MySQL
- **Security**: JWT Authentication
- **API Communication**: REST APIs
- **Deployment**: Docker, Kubernetes
- **Frontend**: Angular
- **(Optional)** Kafka for event-driven communication

## Microservices Architecture
1. **Account Service** (`account-service`)
   - Manages users and bank accounts
   - Handles login and authentication (JWT)
   - Role-based security (Admin/User)
   
2. **Cards Service** (`cards-service`)
   - Manages card issuance, activation, and transactions
   
3. **Transaction Service** (`transaction-service`)
   - Handles transactions, transfers, and transaction history

4. **API Gateway** (`api-gateway`)
   - Centralized entry point for all services
   - Routes requests to appropriate microservices

## Installation & Setup
### Prerequisites
- Java 17+
- MySQL Database
- Docker & Kubernetes
- Postman (for API testing)

### Running Services
1. Clone the repositories:
   ```sh
   git clone <account-service-repo>
   git clone <cards-service-repo>
   git clone <transaction-service-repo>
   git clone <api-gateway-repo>
   ```
2. Configure MySQL database in `application.properties` for each service.
3. Run services:
   ```sh
   mvn spring-boot:run
   ```
4. Start the API Gateway:
   ```sh
   mvn spring-boot:run
   ```

## API Endpoints
- **Account Service**
  - `POST /register` – Register a new user
  - `POST /login` – Authenticate and get JWT
- **Cards Service**
  - `GET /cards/{userId}` – Fetch user’s cards
- **Transaction Service**
  - `POST /transfer` – Transfer funds

## Future Improvements
- Implement Kafka for event-driven communication.
- Add fraud detection mechanisms.
- Improve logging and monitoring with ELK stack.

## Contact
For any queries, feel free to reach out via email or GitHub issues.

