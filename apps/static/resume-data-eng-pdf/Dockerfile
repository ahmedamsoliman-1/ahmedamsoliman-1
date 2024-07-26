# Step 1: Build the React app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./
# COPY yarn.lock ./  # Uncomment this if using Yarn

# Install dependencies
RUN npm install
# RUN yarn install  # Uncomment this if using Yarn

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build
# RUN yarn build  # Uncomment this if using Yarn

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy built files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
