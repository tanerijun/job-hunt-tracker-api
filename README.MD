## myJobs - Backend
The backend of myJobs. 

A simple fullstack app to track your job hunting status.

#### Setup

```bash
npm install && npm start
```

1. Setup .env in the root
```
MONGO_URI = <Your mongoDB connection string>
JWT_SECRET = <Your JWT_Secret (can be any string but I recommend using a key generator)>
```

#### What's working

- Input validation with Mongoose
- Hash Password (with bcryptjs)
- Save User to mongoDB
- Generate JWT Token
- Error handling for various scenarios
- User authentication

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
