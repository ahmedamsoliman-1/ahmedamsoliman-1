FROM alpine

# # Install required packages
# RUN apt-get update && apt-get install -y \
#     curl \
#     telnet \
#     ssh \
#     openssh-client \
#     ca-certificates \
#     && rm -rf /var/lib/apt/lists/*

# # Install kubectl
# RUN curl -LO "https://dl.k8s.io/release/v1.28.0/bin/linux/amd64/kubectl" \
#     && chmod +x kubectl \
#     && mv kubectl /usr/local/bin/kubectl

# # Set up SSH for root user
# RUN mkdir /root/.ssh && chmod 700 /root/.ssh

# Set entry point
ENTRYPOINT ["/bin/bash"]
