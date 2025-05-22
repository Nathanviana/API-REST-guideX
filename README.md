
# api-rest-guidex

## Description

The **api-rest-guidex** is a RESTful API developed in Node.js with Express and Prisma, which offers a complete CRUD system for database tables, with authentication and authorization using JWT (JSON Web Tokens). The project focuses on security, route organization, and clear documentation via Swagger.

---

## Technologies Used

- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- JWT (JSON Web Tokens) for authentication  
- SQLite (or database configured in `.env`)  
- Swagger (OpenAPI) for API documentation  
- dotenv for managing environment variables  

---

## Prerequisites

- Node.js (v16 or higher) installed  
- npm or yarn  
- Git  

---

## How to Run the Project

1. Clone the repository  
   ```bash
   git clone https://github.com/Nathanviana/API-REST-guideX.git
   cd api-rest-guidex
   ```

2. Install dependencies  
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables  
   Create a `.env` file in the root of the project with the required variables, for example:  
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your_secret_key_here"
   JWT_EXPIRES_IN="1h"
   ```

4. Run the database migrations  
   ```bash
   npx prisma migrate dev
   ```

5. Start the server  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. The API will be available at:  
   ```
   http://localhost:3000
   ```

---

## Basic Project Structure

```
/src
 ├── controllers/         # Endpoint logic
 ├── routes/              # Route definitions
 ├── middlewares/         # Authentication and permission middlewares
 ├── services/            # Auxiliary services and business logic
 ├── prisma/              # Prisma schema and migrations
 ├── utils/               # Utility functions (e.g., token generation)
 ├── app.ts               # Main Express configuration
 └── server.ts            # Server initialization
```

---

## Swagger Documentation

The API has interactive documentation generated with Swagger. After running the project, access:  
```
http://localhost:3000/api-docs
```
There you can explore the endpoints, see the parameters, and test requests directly in the browser.

---

## Important Notes

- The project uses **refresh tokens** to maintain secure sessions.  
- Logging out invalidates the active token.  
- The business rule unified the user and student tables into a single `User` table to avoid redundancy.  
- A custom middleware controls permissions between regular users and administrators.

---

## References

- [JWT - JSON Web Tokens](https://jwt.io/introduction)  
- [Prisma ORM](https://www.prisma.io/docs/)  
- [Swagger OpenAPI](https://swagger.io/specification/)  

---

## Contact

If you have any questions or suggestions, please open an issue in the repository or contact the developer.

---
