# Frontend Service

This service provides a web interface to manage users and orders.

## Structure
```
frontend-service/
├── src/
│   ├── app.js
│   ├── views/
│   │   ├── index.ejs
│   │   ├── users.ejs
│   │   ├── orders.ejs
│   ├── routes/
│   │   ├── index.js
│   │   ├── users.js
│   │   ├── orders.js
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## Running the Service

To build and run the Docker container:


```bash
docker build -t frontend-svc .
docker run -p 8080:8080 -e USER_SERVICE_URL=http://localhost:5000/users -e ORDER_SERVICE_URL=http://localhost:5001/orders frontend-svc
```

## Web Interface
```
GET /: Home page with links to manage users and orders.
GET /users: Manage Users.
GET /orders: Manage Orders.
```