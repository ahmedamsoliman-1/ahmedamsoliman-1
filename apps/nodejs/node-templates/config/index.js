const dotenv = require('dotenv');
process.env.ENV = process.env.ENV || 'development';
const ENVPATH = process.env.ENVPATH || '.env';

const envFound = dotenv.config({ path: ENVPATH });
if (!envFound) {
  throw new Error('.env file not found');
}
const env = process.env;

const configObj = {
  ENVIRONMENT: env.ENV,
  APP_VERSION: env.APP_VERSION || '0.0.1',
  APP_PORT: env.APP_PORT || 80,
  APP_NAME: env.APP_NAME || 'AAMS Super NodeJS App',
  K8: {
    K8_KUBECONFIG_FILE: env.K8_KUBECONFIG_FILE
  },
  VID: {
    VID: env.VID || '../public/videos',
    VID_W: env.VID_W || '../../../../../mnt/c/minikube/all/'
 },
  AWS: {
    AWS_REGION: env.AWS_REGION,
    AWS_PROFILE: env.AWS_PROFILE,
    AWS_BUCKET: env.AWS_BUCKET,
    AWS_UPLOAD_BUCKET: env.AWS_UPLOAD_BUCKET,
    CLOUD_WATCH_LIMIT: env.CLOUD_WATCH_LIMIT || 50,
    AWS_PATH: env.AWS_PATH || '',
  },
  GCP: {
    GCP_KEY: env.GCP_KEY,
    GCP_PROJECT: env.GCP_PROJECT,
    GCP_BUCKET: env.GCP_BUCKET,
    GCP_PATH: env.GCP_PATH,
    GCP_UPLOAD_BUCJET: env.GCP_UPLOAD_BUCJET
  },
  OPENSEARCH: {
    OPENSEARCH_HOST: env.OPENSEARCH_HOST,
    OPENSEARCH_PORT: env.OPENSEARCH_PORT || 9200,
    OPENSEARCH_USER: env.OPENSEARCH_USER,
    OPENSEARCH_PASSCODE: env.OPENSEARCH_PASSCODE,
    OPENSEARCH_DOMAIN_NAME: env.OPENSEARCH_DOMAIN_NAME
  },
  CASSANDRA: {
    CASSANDRA_DATACENTER: process.env.CASSANDRA_DATACENTER || 'datacenter1',
    CASSANDRA_LOCALHOST: process.env.CASSANDRA_LOCALHOST || 'localhost',
    CASSANDRA_HOST_ALPHA: process.env.CASSANDRA_HOST_ALPHA || 'localhost',
    CASSANDRA_HOST_BETA: process.env.CASSANDRA_HOST_BETA || 'localhost',
  },
  MEMCACHED: {
    MEMCACHED_HOST: process.env.MEMCACHED_HOST,
    MEMCACHED_PORT: process.env.MEMCACHED_PORT,
  },
  RABBITMQ: {
    RABBITMQ_HOST: env.RABBITMQ_HOST,
    RABBITMQ_PORT: env.RABBITMQ_PORT,
    RABBITMQ_USER: env.RABBITMQ_USER,
    RABBITMQ_PASSWORD: env.RABBITMQ_PASSWORD
  },
  ES: {
    ELASTIC_SEARCH_PORT: process.env.ELASTIC_SEARCH_PORT || 9200,
    ELASTIC_SEARCH_ALIAS: process.env.ELASTIC_SEARCH_ALIAS || 'aams_input_node_template_app',
    ELASTIC_SEARCH_REQUEST_TIME_OUT: process.env.ELASTIC_SEARCH_REQUEST_TIME_OUT || 300,
    ELASTIC_SEARCH_RETRY_INTERVAL: process.env.ELASTIC_SEARCH_RETRY_INTERVAL || 2000,
    ELASTIC_SEARCH_MAX_RETRIES: process.env.ELASTIC_SEARCH_MAX_RETRIES || 5,

    ELASTIC_SEARCH_HOST_LOCAL: process.env.ELASTIC_SEARCH_HOST_LOCAL || 'localhost',
    ELASTIC_SEARCH_CERT_LOCAL: process.env.ELASTIC_SEARCH_CERT_LOCAL,
    ELASTIC_SEARCH_AK_LOCAL: process.env.ELASTIC_SEARCH_AK_LOCAL || 'elastic',
    ELASTIC_SEARCH_SK_LOCAL: process.env.ELASTIC_SEARCH_SK_LOCAL || 'ggimdalbit',
    ELASTIC_SEARCH_HOST_DEV: process.env.ELASTIC_SEARCH_HOST_DEV || 'localhost',
    ELASTIC_SEARCH_CERT_DEV: process.env.ELASTIC_SEARCH_CERT_DEV,
    ELASTIC_SEARCH_AK_DEV: process.env.ELASTIC_SEARCH_AK_DEV || 'elastic',
    ELASTIC_SEARCH_SK_DEV: process.env.ELASTIC_SEARCH_SK_DEV || 'ggimdalbit',
    ELASTIC_SEARCH_HOST: process.env.ELASTIC_SEARCH_HOST || 'localhost',
    ELASTIC_SEARCH_CERT: process.env.ELASTIC_SEARCH_CERT,
    ELASTIC_SEARCH_AK: process.env.ELASTIC_SEARCH_AK || 'elastic',
    ELASTIC_SEARCH_SK: process.env.ELASTIC_SEARCH_SK || 'ggimdalbit',
  }, 
  KIBANA: {
    KIBANA_URL: process.env.KIBANA_URL || 'aichess-kibana-prod.avrioc.io',
    KIBANA_USERNAME: process.env.ELASTIC_SEARCH_AK_DEV || 'elastic',
    KIBANA_PASSWORD: process.env.ELASTIC_SEARCH_SK_DEV || 'ggimdalbit',
  },
  MONGO: {
    MONGO_URI: process.env.MONGO_URL,
    MONGO_URI_AHMED: process.env.MONGO_URL,
    MONGO_URI_MONGO_URI_LOCALHOST_1: process.env.MONGO_URL
  },
  REDIS: {
    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  },
  GITHUB: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  },
  EMAIL: {
    GMAIL_SENDER_NAME: process.env.GMAIL_SENDER_NAME,
    GMAIL_SENDER: process.env.GMAIL_SENDER,
    GMAIL_RECIVER_1: process.env.GMAIL_RECIVER_1,
    GMAIL_RECIVER_2: process.env.GMAIL_RECIVER_2,
    GMAIL_SENDER_APP_PASSWORD: process.env.GMAIL_SENDER_APP_PASSWORD,
    GMAIL_SENDER_APP_PASSWORD: process.env.GMAIL_SENDER_APP_PASSWORD,
  },
  MYSQL: {
    MYSQL_HOST: env.MYSQL_HOST || 'localhost',
    MYSQL_USER: env.MYSQL_USER || 'ahmed',
    MYSQL_PASSWORD: env.MYSQL_PASSWORD || 'ahmed',
    MYSQL_DATABASE: env.MYSQL_DATABASE || 'ahmed',
    MYSQL_PASSWORD: env.MYSQL_PASSWORD || 'mysql_native_password',
  },
  POSTGRESQL: {
    POSTGRESQL_SQL_USER: env.POSTGRESQL_SQL_USER || 'monitoring',
    POSTGRESQL_SQL_HOST: env.POSTGRESQL_SQL_HOST || 'localhost',
    POSTGRESQL_SQL_DB: env.POSTGRESQL_SQL_DB || 'monitoring-article',
    POSTGRESQL_SQL_PASSWORD: env.POSTGRESQL_SQL_PASSWORD || 'secret',
    POSTGRESQL_SQL_PORT: env.POSTGRESQL_SQL_PORT || 5432,
  },
  MYSQL: {
    MYSQL_USER: env.MYSQL_USER || '',
    MYSQL_HOST: env.MYSQL_HOST || '',
    MYSQL_DB: env.MYSQL_DB || '',
    MYSQL_PASSWORD: env.MYSQL_PASSWORD || '',
    MYSQL_PORT: env.MYSQL_PORT || ''
  },
  KAFKA: {
    KAFKA_BROKERS: env.KAFKA_BROKERS || 'localhost:9092',
  }
};

module.exports = configObj;
