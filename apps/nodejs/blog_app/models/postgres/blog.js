const { Sequelize, DataTypes } = require('sequelize');
const ll = require('../../middleware/utils');
let config = require('../../config/config');


const sequelize = new Sequelize(config.POSTGRES_DB_URI, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL connection
      rejectUnauthorized: false, // If using a self-signed certificate
    },
  },
  logging: false, // Disable Sequelize logging
});

sequelize
  .authenticate()
  .then(() => {
    ll.llog('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.TEXT,
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

sequelize.sync().then(() => {
  ll.llog("Database synchronized");
  return Blog.findAll();  // Fetch the blogs only after the table is created
}).then(blogs => {}).catch(err => {
  console.error("Error retrieving blogs: ", err);
});

module.exports = Blog;
