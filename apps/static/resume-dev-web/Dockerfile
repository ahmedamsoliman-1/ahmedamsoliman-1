FROM nginx:alpine

# Copy all files from the current directory to the nginx html directory
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
