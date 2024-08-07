# Stage 1: Build
FROM gcc:latest AS build

# Fix broken packages and update
RUN apt-get update && \
    apt-get install -y --fix-broken && \
    apt-get upgrade -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install each package separately
RUN apt-get update && \
    apt-get install -y g++ \
    && apt-get install -y make \
    && apt-get install -y cmake \
    && apt-get install -y libpthread-stubs0-dev \
    && apt-get install -y libasio-dev \
    && apt-get install -y libboost-all-dev \
    && apt-get install -y git


# Clone Crow library
RUN git clone https://github.com/ipkn/crow.git /crow

# Build Crow
WORKDIR /crow
RUN cmake . && make && make install

# Set working directory
WORKDIR /app

# Copy source files
COPY . .

# Build the application
RUN make

# Stage 2: Run
FROM ubuntu:latest

# Install runtime dependencies
RUN apt-get update && \
    apt-get install -y \
    libpthread-stubs0-dev \
    libasio-dev \
    libboost-all-dev

# Set working directory
WORKDIR /app

# Copy the built binary from the build stage
COPY --from=build /app/cppwebapp1 .

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["./cppwebapp1"]
