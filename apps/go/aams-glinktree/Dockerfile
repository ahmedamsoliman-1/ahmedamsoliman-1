# Start from the official Go image
FROM golang:1.20-alpine

# Set the current working directory inside the container
WORKDIR /app

# Copy go.mod and initialize dependencies
COPY go.mod ./
RUN go mod tidy

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o main ./cmd/server

EXPOSE 8080

CMD ["./main"]
