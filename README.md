# Store App

## Overview

A Full Stack Web Application that allows users to submit ratings for stores registered on the platform.

The application supports three types of users:

* System Administrator
* Normal User
* Store Owner

Built using:

* React.js
* Node.js
* Express.js
* MySQL
* JWT Authentication
* Bootstrap

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Role Based Authorization
* Logout
* Password Change

---

### Admin

* Dashboard Statistics
* Add Stores
* Add Users (Admin/User)
* View Store List
* View User List
* Search Users
* Search Stores
* Pagination
* Sorting
* User Details

---

### Normal User

* Signup/Login
* View Stores
* Search Stores
* Submit Rating
* Update Rating
* View Submitted Rating
* Change Password
* Logout

---

### Store Owner

* Login
* View Ratings Submitted by Users
* View Average Store Rating
* Change Password
* Logout

---

## Form Validations

* Name: 20-60 Characters
* Address: Maximum 400 Characters
* Password:

  * 8-16 Characters
  * One Uppercase Letter
  * One Special Character
* Email Validation

---

## Tech Stack

Frontend:

* React.js
* Bootstrap
* Axios

Backend:

* Node.js
* Express.js

Database:

* MySQL

Authentication:

* JWT
* bcryptjs

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Environment Variables

Create a .env file inside backend:

```env
PORT=5000
JWT_SECRET=your_secret_key
```

---

## Database

Run the SQL queries from database.sql to create the required tables before starting the application.

database.sql

Then update your database credentials inside:

backend/config/db.js

---

## Author

Kirti Bharate

MCA Graduate | Java Full Stack Developer

GitHub:
https://github.com/YOUR_GITHUB_USERNAME
