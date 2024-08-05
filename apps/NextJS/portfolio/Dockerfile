# # Stage 1: Build the Vite app
# FROM node:alpine as builder

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json files
# COPY package.json ./
# COPY package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy everything to /app directory
# COPY ./ ./

# # Build the Vite app
# RUN npm run build

# # Stage 2: Serve the app with Nginx
# FROM nginx:alpine

# # Copy the build output to Nginx
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Copy the Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]


# Stage 1: Build the app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
