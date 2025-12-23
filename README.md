# Student Placement Tracker

A full-stack web application to manage and track student placement details with secure authentication and role-based access.

This project demonstrates backend API development, JWT authentication, database integration, and frontend–backend communication using REST APIs.

---

## Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- Student profile creation and update
- Placement details tracking (company, package, status)
- Role-based access (student / admin)
- Admin can view all students
- Logout functionality
- Clean frontend dashboard

---

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript (Vanilla JS)

### Backend
- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## Environment Variables

Create a `.env` file in the root directory:

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=your_mysql_password  
DB_NAME=placement_tracker  
JWT_SECRET=your_jwt_secret  

 `.env` is ignored in `.gitignore` for security.

---

## Database Setup (MySQL)

```sql
CREATE DATABASE placement_tracker;
USE placement_tracker;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student'
);

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  branch VARCHAR(50),
  company VARCHAR(100),
  package_lpa FLOAT,
  status ENUM('Placed', 'Not Placed') DEFAULT 'Not Placed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
