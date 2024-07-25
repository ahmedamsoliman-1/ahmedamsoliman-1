const Kafka = require('node-rdkafka');
const middleware = require('../middlewares/utils');
require('dotenv').config();
const env_config = require('../config');

class KafkaClient {
  constructor(config) {
    this.kafkaConfig = config || {
      'metadata.broker.list': env_config.KAFKA.KAFKA_BROKERS,
      'group.id': 'kafka-group', // You can change this based on your needs
      'enable.auto.commit': false,
      'auto.offset.reset': 'earliest',
    };
    this.consumer = new Kafka.KafkaConsumer(this.kafkaConfig);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.consumer.connect();
      
      this.consumer
      .on('ready', () => {
          middleware.llog('Kafka consumer ready', 'cyan', 'queue');
          const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
          const connected = `- ${middleware.colorMiddleware.cyan}Connected To ${middleware.colorMiddleware.yellow}'Kafka'`;
          const succ = `${middleware.colorMiddleware.cyan}Successfully${middleware.colorMiddleware.reset}`;
          const loc = `at ${middleware.colorMiddleware.green}${this.kafkaConfig['metadata.broker.list']}${middleware.colorMiddleware.reset}`;
          console.log(time, connected, succ, loc);
          resolve();
        })
        .on('event.error', (err) => {
          // console.error('Error in Kafka connection:', err);
          // reject(err);
          const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
          const nconnected = `- ${middleware.colorMiddleware.red} Not Connected To ${middleware.colorMiddleware.yellow}'Kafka'`;
          const loc = `at ${middleware.colorMiddleware.green}${this.kafkaConfig['metadata.broker.list']}${middleware.colorMiddleware.reset}`;
          const error = `at ${middleware.colorMiddleware.red}${err}${middleware.colorMiddleware.reset}`;
          console.log(time, nconnected, loc, error);
        });
    });
  }

  getKafkaInfo() {
    return {
      host: this.kafkaConfig['metadata.broker.list']
    }
  }

  subscribe(topic) {
    return new Promise((resolve, reject) => {
      this.consumer.subscribe([topic]);
      this.consumer.consume();
      
      this.consumer
        .on('data', (data) => {
          // Process incoming Kafka messages here
          console.log(`Received message: ${data.value.toString()}`);
        })
        .on('error', (err) => {
          console.error('Error in Kafka consumer:', err);
          reject(err);
        });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      this.consumer.disconnect((err, metadata) => {
        if (err) {
          console.error('Error disconnecting from Kafka:', err);
          reject(err);
        } else {
          console.log('Disconnected from Kafka:', metadata);
          resolve();
        }
      });
    });
  }
}

module.exports = KafkaClient;
