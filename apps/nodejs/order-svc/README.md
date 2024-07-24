

# Order Service

This service manages orders.

## Structure
```
order-service/
├── src/
│   ├── app.js
│   ├── order.js
├── Dockerfile
├── package.json
└── README.md
```

## Running the Service

To build and run the Docker container:

```bash
docker build -t order-svc .
docker run -p 5001:5001 -e USER_SERVICE_URL=http://localhost:5000/users order-svc
```

## API Endpoints
```
GET /orders: Get All orders
GET /orders/:orderId: Get order by ID
POST /orders: Create a new order
```