const amqp = require('amqplib');
const middleware = require('../middlewares/utils');
require('dotenv').config();

const config = require('../config');
class RabbitConnector {
  constructor() {
    this.host = config.RABBITMQ.RABBITMQ_HOST;
    this.port = config.RABBITMQ.RABBITMQ_PORT,
    this.user = config.RABBITMQ.RABBITMQ_USER,
    this.password = config.RABBITMQ.RABBITMQ_PASSWORD;
    this.channel = null;
  }

  get rabbitmqUri() {
    return `amqp://${this.user}:${this.password}@${this.host}:${this.port}`;
  }

  async connect() {
    try {
      const connection = await amqp.connect(this.rabbitmqUri);
      this.channel = await connection.createChannel();
      const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
      const connected = `- ${middleware.colorMiddleware.cyan}Connected To ${middleware.colorMiddleware.yellow}'RabbitMQ'`;
      const succ = `${middleware.colorMiddleware.cyan}Successfully${middleware.colorMiddleware.reset}`;
      const loc = `at ${middleware.colorMiddleware.green}${this.host} ${middleware.colorMiddleware.reset}`;
      console.log(time, connected, succ, loc);
    } catch (error) {
      const time = `${middleware.colorMiddleware.magenta}${middleware.nowMiddleware}${middleware.colorMiddleware.reset}`;
      const nconnected = `- ${middleware.colorMiddleware.red}Not Connected To ${middleware.colorMiddleware.yellow}'RabbitMQ'`;
      const loc = `at ${middleware.colorMiddleware.green}${this.host} ${middleware.colorMiddleware.reset}`;
      console.log(time, nconnected, loc);
    }
  }

  async getRabbitInfo() {
    return {
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      rabbitmqUri: this.rabbitmqUri,
      isConnected: !!this.channel, // Check if channel is initialized
    };
  }

  async currentExchangesList(){
    try {
      const exchanges = await this.channel.assertExchange('exchanges', 'fanout');
      return exchanges;
    } catch (error) {
      console.log('Error listing Exhanges');
    }
  }

  async setupQueue(queueName) {
    try {
      await this.channel.assertQueue(queueName, { durable: true });
      middleware.llog(`Queue '${queueName}' declared successfully.`, 'cyan', 'queue');
    } catch (error) {
      console.error('Error setting up queue:', error);
    }
  }

  async bindQueueToExchange(queueName, exchangeName, routingKey) {
    try {
      await this.channel.bindQueue(queueName, exchangeName, routingKey);
      middleware.llog(`Queue '${queueName}' bound to exchange '${exchangeName}' with routing key '${routingKey}'.`, 'cyan', 'queue');
    } catch (error) {
      console.error('Error binding queue to exchange:', error);
    }
  }
  
  async setupExchange(exchangeName, exchangeType) {
    try {
      await this.channel.assertExchange(exchangeName, exchangeType);
      middleware.llog(`Exchange '${exchangeName}' declared successfully.`, 'cyan', 'queue');
    } catch (error) {
      console.error('Error setting up exchange:', error);
    }
  }

  async setupAndBindQueue(queueName, exchangeName, routingKey, exchangeType = 'direct') {
    await this.connect();
    await this.setupQueue(queueName);
    await this.setupExchange(exchangeName, exchangeType); // Create the exchange
    await this.bindQueueToExchange(queueName, exchangeName, routingKey);
  }
}

module.exports = RabbitConnector;
