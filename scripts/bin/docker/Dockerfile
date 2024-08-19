# Use the official Nginx base image from the Docker Hub
FROM nginx:latest

# Copy custom configuration file from the current directory to the container
# (Optional) Uncomment the following line if you have a custom nginx.conf
# COPY nginx.conf /etc/nginx/nginx.conf

# Copy static website files to the container
# (Optional) Uncomment the following line if you have static files to serve
# COPY static-html-directory /usr/share/nginx/html


# Expose port 80
EXPOSE 80

# Start Nginx when the container has provisioned
CMD ["nginx", "-g", "daemon off;"]
