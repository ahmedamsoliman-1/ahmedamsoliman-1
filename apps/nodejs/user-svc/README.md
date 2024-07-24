# User Service

This service manages user data.

## Structure
```
user-svc/
├── src/
│   ├── app.js
│   ├── user.js
├── Dockerfile
├── package.json
└── README.md
```

## Running the Service

To build and run the Docker container:

```bash
docker build -t user-svc .
docker run -p 5000:5000 user-svc
```


## API Endpoints
```
GET /users: Get All users
GET /users/:userId: Get user by ID
POST /users: Create a new user
```