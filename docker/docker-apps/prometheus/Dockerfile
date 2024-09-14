# Use official Prometheus image as the base
FROM prom/prometheus:latest

# Add Prometheus configuration file
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Expose the default Prometheus port
EXPOSE 9090

# Start Prometheus server
CMD [ "/bin/prometheus", "--config.file=/etc/prometheus/prometheus.yml" ]
