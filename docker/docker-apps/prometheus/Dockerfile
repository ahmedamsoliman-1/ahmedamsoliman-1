# Use the official Prometheus image
FROM prom/prometheus:latest

# Add Prometheus configuration file to the container
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Expose the default Prometheus port
EXPOSE 9090

# Start Prometheus with the correct command
CMD ["--config.file=/etc/prometheus/prometheus.yml"]
