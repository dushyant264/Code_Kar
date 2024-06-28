# Code_Kar API Documentation

Welcome to the CodeJudge API documentation. This API provides endpoints for user authentication, problem management, leaderboard retrieval, and code execution for coding problems.

## Usage

1. Clone the repository:
   - git clone 

## Table of Contents

1. [User Authentication](#user-authentication)
2. [Leaderboard](#leaderboard)
3. [Problem Management](#problem-management)
4. [Code Execution](#code-execution)

---

## User Authentication

### Sign Up

- **URL**: `/api/signup`
- **Method**: `POST`

### Login

- **URL**: `/api/login`
- **Method**: `POST`

### Get User

- **URL**: `/api/user`
- **Method**: `GET`
- **Middleware**: Requires authentication (`auth` middleware).

---

## Leaderboard

### Get Leaderboard

- **URL**: `/api/leaderboard`
- **Method**: `GET`
- **Middleware**: Requires authentication (`auth` middleware).

---

## Problem Management

### Get Problem by Slug

- **URL**: `/api/problem/:slug`
- **Method**: `GET`
- **Middleware**: Requires authentication (`auth` middleware).

### Get All Problems

- **URL**: `/api/problem`
- **Method**: `GET`
- **Middleware**: Requires authentication (`auth` middleware).

---

## Code Execution

### Run Code

- **URL**: `/api/run`
- **Method**: `POST`
- **Middleware**: Requires authentication (`auth` middleware).

### Submit Problem Solution

- **URL**: `/api/check/:slug`
- **Method**: `POST`
- **Middleware**: Requires authentication (`auth` middleware).

---

## Admin Endpoints

### Add Problem

- **URL**: `/admin/problem`
- **Method**: `POST`
- **Middleware**: Requires authentication and admin rights (`auth`, `checkAdmin` middleware).

### Edit Problem

- **URL**: `/admin/problem/:id`
- **Method**: `PUT`
- **Middleware**: Requires authentication and admin rights (`auth`, `checkAdmin` middleware).

---


