const client = require('../db/cassandra/cassandra');


const createUser = async (username, password) => {
  return await client.createUser(username, password);
};

const getUserByUsername = async (username) => {
  return await client.getUserByUsername(username);
};

const updateUserRole = async (role_or_user) => {
  return await client.updateUserRole(role_or_user);
};


module.exports = {
  createUser,
  getUserByUsername,
  updateUserRole,
};
