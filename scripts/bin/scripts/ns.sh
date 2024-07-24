#!/bin/bash

# List of domains to check

nlbs=(
    "http://cs2-platform-engine-svc-nlb-de2bf748ffbdbc4e.elb.me-central-1.amazonaws.com",
    "http://cs2-platform-backend-svc-nlb-68fe18baccba8e90.elb.me-central-1.amazonaws.com",
    "http://internal-cs2-platform-frontend-svc-alb-201962685.me-central-1.elb.amazonaws.com",
)

domains=(
    "cs2-tree-ui.avrioc.io"
    "cs2-ai-chess-platform.avrioc.io"
    "cs2-ai-chess-platform-backend.avrioc.io"
    "jenkins-ai-chess-non-prod.avrioc.io"
)

results=()

# Perform nslookup for each domain
for domain in "${nlbs[@]}"; do
    result=$(nslookup "$domain" 2>&1)

    # Process the result for better alignment
    clean_result=$(echo "$result" | awk 'NF' | sed 's/^[ \t]*//;s/[ \t]*$//' | tr -s '\n' ' ')
    if [[ $? -eq 0 ]]; then
        results+=("$domain" "$clean_result")
    else
        results+=("$domain" "Error: $result")
    fi
done



# Perform nslookup for each domain
for domain in "${domains[@]}"; do
    result=$(nslookup "$domain" 2>&1)

    # Process the result for better alignment
    clean_result=$(echo "$result" | awk 'NF' | sed 's/^[ \t]*//;s/[ \t]*$//' | tr -s '\n' ' ')
    if [[ $? -eq 0 ]]; then
        results+=("$domain" "$clean_result")
    else
        results+=("$domain" "Error: $result")
    fi
done

# Display results in a table
printf "%-40s %-40s\n" "Domain" "Result"
for ((i = 0; i < ${#results[@]}; i += 2)); do
    printf "%-40s %-40s\n" "${results[i]}" "${results[i + 1]}"
done
