const users = {};

const getUser = (userId) => users[userId];

const createUser = (userData) => {
  const userId = (Object.keys(users).length + 1).toString();
  users[userId] = userData;
  return { id: userId, ...userData };
};

const resetUsers = () => {
  for (const key in users) {
    delete users[key];
  }
};

module.exports = { getUser, createUser, resetUsers };
