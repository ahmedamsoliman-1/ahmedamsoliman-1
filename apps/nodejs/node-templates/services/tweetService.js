// // const { Client } = require('pg');
// const pgClient = require('../db/PostgreSQL'); 

// class TweetService {
//   constructor() {
//     this.pgClient = pgClient;
//     this.createTable(); 
//   }

//   async createTable() {
//     try {
//       const query = `
//         CREATE TABLE IF NOT EXISTS tweets (
//           id SERIAL PRIMARY KEY,
//           message TEXT NOT NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )`;
//       await this.pgClient.query(query);
//     } catch (error) {
//       throw new Error(`Error creating tweets table: ${error.message}`);
//     }
//   }

//   async listTweets(total = 50) {
//     try {
//       const res = await this.pgClient.query({
//         text: 'SELECT * FROM tweets ORDER BY created_at DESC LIMIT $1',
//         values: [total],
//       });
//       return res.rows;
//     } catch (error) {
//       throw new Error(`Error listing tweets: ${error.message}`);
//     }
//   }

//   async createTweet(message) {
//     try {
//       const res = await this.pgClient.query({
//         text: 'INSERT INTO tweets(message) VALUES($1) RETURNING *',
//         values: [message],
//       });
//       return res.rows[0];
//     } catch (error) {
//       throw new Error(`Error creating tweet: ${error.message}`);
//     }
//   }
// }

// module.exports = new TweetService();
