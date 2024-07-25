const { client } = require('./cassandraConnector');


const users_table = 'users';
const logs_table = 'logs';
const keyspaces = require('./cassandraSchemas').keyspaces.aams.name;


const createUser = async (username, password) => {
  const query = `INSERT INTO ${keyspaces}.${users_table} (username, password, user_id) VALUES (?, ?, uuid())`;
  const params = [username, password];
  return await client.execute(query, params, { prepare: true });
};



const getUserByUsername = async (username) => {
  try {
    const query = `SELECT * FROM ${keyspaces}.${users_table} WHERE username = ? ALLOW FILTERING`;
    const params = [username];
    const result = await client.execute(query, params, { prepare: true });
    return result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};





const getAllUsers = async (pageSize = 5000) => {
  let query = `SELECT * FROM ${keyspaces}.${users_table}`;
  query += ` LIMIT ${pageSize}`;
  const result = await client.execute(query);
  return result;
}








const getUser = async (username) => {
  try {
    const query = `SELECT * FROM ${keyspaces}.${users_table} WHERE username = ? ALLOW FILTERING`;
    const params = [username];
    const result = await client.execute(query, params);
    return result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}








const updateUser = async (username, requested_field_to_update, new_value) => {
  try {
    const userData = await getUser(username);

    const player_id = userData.rows[0].player_id;

    const query = `UPDATE players SET ${requested_field_to_update} = ? WHERE player_id = ?`;
    const params = [new_value, player_id];

    const result = await client.execute(query, params);
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


const updateUserRole = async (role_or_user) => {
  try {
    const query = 'SELECT * FROM users';
    const result = await client.execute(query);
    for (const user of result.rows) {
      const updateQuery = 'UPDATE users SET aws_user_role = ? WHERE user_id = ?';
      await client.execute(updateQuery, [role_or_user, user.user_id]);
    }

    return `Updated role for all users.`;

  } catch (error) {
    console.error('Error updating user or role:', error);
    throw error; 
  }
};








async function deleteAllPlayers() {
  const query = `TRUNCATE ${users_table}`;

  try {
    await client.execute(query);
    console.log('All users deleted successfully.');
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}


async function deleteAllGames() {
  const query = `TRUNCATE ${games_table}`;

  try {
    await client.execute(query);
    console.log('All games deleted successfully.');
  } catch (error) {
    console.error('Error deleting games:', error);
  }
}




async function deleteAllLogs() {
  const query = `TRUNCATE ${logs_table}`;


  try {
    await client.execute(query);
    console.log('All logs deleted successfully.');
  } catch (error) {
    console.error('Error deleting logs:', error);
  }
}





async function logToCassandra(payload) {
  const query = `INSERT INTO ${logs_table} (log_id, timestamp, method, url, ip, message, agent, host) VALUES (uuid(), ?, ?, ?, ?, ?, ?, ?)`;
  const params = [payload.timestamp, payload.method, payload.url, payload.ip, payload.message, payload.agent, payload.host];

  try {
    await client.execute('USE aams');
    await client.execute(
      query,
      params,
    );
  } catch (error) {
    console.log(timestamp, method, url, ip, message)
    console.error('logToCassandra: Error inserting log:', error);
  }
}







module.exports = {
  createUser,
  getUserByUsername,

  getUser,


  updateUser,


  logToCassandra,

  deleteAllGames,
  deleteAllLogs,
  deleteAllPlayers,
  updateUserRole,
};

