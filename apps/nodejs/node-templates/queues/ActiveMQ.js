const WebSocket = require('websocket').w3cwebsocket;

class ActiveMQConnector {
  constructor(host, port, user, password) {
    this.host = host || 'localhost';
    this.port = port || 61613;
    this.user = user || 'admin';
    this.password = password || 'admin';
    this.client = null;
  }

  get activeMQUri() {
    return `ws://${this.host}:${this.port}/stomp`;
  }

  async connect() {
    try {
      const client = new WebSocket(this.activeMQUri);
      client.onopen = () => {
        const time = new Date().toLocaleString();
        console.log(`Connected to ActiveMQ at ${time}`);
      };
      this.client = client;
    } catch (error) {
      console.error('Error connecting to ActiveMQ:', error);
    }
  }

  async getActiveMQInfo() {
    return {
      host: this.host,
      port: this.port,
      user: this.user,
      password: this.password,
      activeMQUri: this.activeMQUri,
      isConnected: !!this.client, // Check if client is initialized
    };
  }

  async subscribe(destination, callback) {
    try {
      this.client.onmessage = message => {
        console.log(`Received message from ${destination}:`, message.data);
        callback(message.data);
      };
    } catch (error) {
      console.error('Error subscribing to destination:', error);
    }
  }

  async sendMessage(destination, message) {
    try {
      this.client.send(message);
      console.log(`Sent message to ${destination}:`, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async disconnect() {
    try {
      this.client.close();
      console.log('Disconnected from ActiveMQ');
    } catch (error) {
      console.error('Error disconnecting from ActiveMQ:', error);
    }
  }
}

module.exports = ActiveMQConnector;
