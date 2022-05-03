# jobHuntTracker - API
An API to track your job hunting status.

## Installation

1. Setup the project
  ```bash
  npm install && npm start
  ```

2. Setup .env in the root
  ```
  MONGO_URI = <Your mongoDB connection string>
  JWT_SECRET = <Your JWT_Secret (can be any string but I recommend using a key generator)> 
  ```

## What's working

- Input validation with Mongoose
- Hash Password (with bcryptjs)
- Save User to mongoDB
- Generate JWT Token
- Error handling for various scenarios
- User authentication
- Security with helmet, cors, xss-clean, and express-rate-limit
- Documentation with swagger
