# Use official Grafana image as the base
FROM grafana/grafana:latest

# Set environment variables for admin credentials
ENV GF_SECURITY_ADMIN_USER=admin
ENV GF_SECURITY_ADMIN_PASSWORD=admin

# Expose the default Grafana port
EXPOSE 3000

# Start Grafana server
CMD [ "/run.sh" ]
