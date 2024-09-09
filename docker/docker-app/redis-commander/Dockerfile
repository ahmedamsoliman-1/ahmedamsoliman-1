# # Use the base image
# FROM ghcr.io/joeferner/redis-commander:latest

# # Set environment variables
# ENV REDIS_LABEL=${REDIS_LABEL_RENDER}
# ENV REDIS_HOST=${REDIS_HOST_RENDER}
# ENV REDIS_USERNAME=${REDIS_USERNAME_RENDER}
# ENV REDIS_PASSWORD=${REDIS_PASSWORD_RENDER}
# ENV REDIS_TLS=true

# Use the base image
FROM ghcr.io/joeferner/redis-commander:latest

# # Set build-time environment variables
# ARG REDIS_HOST
# ARG REDIS_USERNAME
# ARG REDIS_PASSWORD

# Set runtime environment variables (optional, if needed)
ENV REDIS_LABEL=Render
ENV REDIS_HOST=oregon-redis.render.com
ENV REDIS_USERNAME=red-crfeunjgbbvc73c3kcqg
ENV REDIS_PASSWORD=HZzTcTCEFYRaxBMc2zUgvE4UxmbpoE0Z
ENV REDIS_TLS=true
