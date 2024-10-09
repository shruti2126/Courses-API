# Course Management API

This project is a simple RESTful API that allows for basic CRUD (Create, Read, Update, Delete) operations on a list of courses. The API is built with Node.js and Sequelize ORM and connects to a PostgreSQL database.

# Features:
1. CRUD for Users (Create, Retrieve, Update and Delete users)
2. CRUD for Courses (Create, Retrieve, Update and Delete Courses)

# Tech Stack:
  Node.js
  Express.js
  Sequelize ORM
  PostgreSQL

# Setup Instructions

# Prerequisites:
- Install Node.js: Node.js
- Install PostgreSQL: PostgreSQL
- Ensure PostgreSQL service is running on default port 5432
- Create a PostgreSQL database:
        **  psql -U postgres
      CREATE DATABASE courseapi;**
  
# Configuration:
- **Clone this repository**
  - git clone https://github.com/yourusername/course-api.git
  - cd course-api
- **Install dependencies**
    npm install
- **Create a new .env file with following variables:**
    - DB_NAME=courseapi
    - DB_USER=postgres
    - DB_PASSWORD=yourpassword

# Running the API
The server will start on http://localhost:3000.
- GET /courses: Retrieve all courses
- POST /courses: Create a new course
- PUT /courses/: Update a course by ID
- DELETE /courses/: Delete a course by ID
