#!/bin/bash



# Define the Airbyte version
AIRBYTE_VERSION="0.57.2"
ELASTIC_VERSION="8.12.2"
$LATEST="$LATEST"

docker_images=(
    "webcenter/activemq:$LATEST"
    "adminer"
    "cassandra:$LATEST"
    "grafana/grafana"
    "jenkins/jenkins:lts"
    "confluentinc/cp-zookeeper:7.4.0"
    "hlebalbau/kafka-manager:stable"
    "confluentinc/cp-server:7.4.0"
    "wurstmeister/kafka"
    "confluentinc/cp-schema-registry:7.4.0"
    "confluentinc/cp-enterprise-control-center:7.4.0"
    "apache/airflow:2.6.0-python3.9"
    "postgres:14.0"
    "bitnami/spark:$LATEST"
    "memcached:$LATEST"
    "mysql:$LATEST"
    "nginx:$LATEST"
    "postgres:$LATEST"
    "prom/prometheus"
    "rabbitmq:management"
    "redis:$LATEST"
    "ghcr.io/joeferner/redis-commander:$LATEST"
    "tomcat:$LATEST"
    "wordpress:$LATEST"
    "docker.elastic.co/elasticsearch/elasticsearch:$ELASTIC_VERSION"
    "docker.elastic.co/kibana/kibana:$ELASTIC_VERSION"
    "docker.elastic.co/beats/metricbeat:$ELASTIC_VERSION"
    "docker.elastic.co/beats/filebeat:$ELASTIC_VERSION"
    "docker.elastic.co/logstash/logstash:$ELASTIC_VERSION"
    "alpine/socat"
    "airbyte/init:$AIRBYTE_VERSION"
    "airbyte/bootloader:$AIRBYTE_VERSION"
    "airbyte/db:$AIRBYTE_VERSION"
    "airbyte/worker:$AIRBYTE_VERSION"
    "airbyte/server:$AIRBYTE_VERSION"
    "airbyte/webapp:$AIRBYTE_VERSION"
    "airbyte/temporal:$AIRBYTE_VERSION"
    "airbyte/cron:$AIRBYTE_VERSION"
    "airbyte/airbyte-api-server:$AIRBYTE_VERSION"
    "airbyte/connector-builder-server:$AIRBYTE_VERSION"
    "airbyte/proxy:$AIRBYTE_VERSION"
)

for image in "${docker_images[@]}"
do
    docker pull "$image"
done

