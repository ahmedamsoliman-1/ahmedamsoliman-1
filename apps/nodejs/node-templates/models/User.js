// User.js

const { client } = require('../db/cassandra/cassandraConnector');
// const { aams_tables_schema } = require('../db/cassandra/cassandraSchemas');
const keyspace = require('../db/cassandra/cassandraSchemas').keyspaces.aams.name;
const users_table = 'users';

const prepare = { prepare: true };
const passport = require('../passportConfig');



class User {
  constructor(username, password, avatar) {
    this.username = username;
    this.password = password;
    this.avatar = avatar;
  }

  async save() {
    try {
      const existingUser = await this.getUserByUsername(this.username);

      if (existingUser.rowLength > 0) {
        return { message: `User ${this.username} already exists` };
      } else {
        await this.createUser();
        return { message: `User @${this.username} created successfully` };
      }
    } catch (error) {
      console.log(error);
      throw new Error('Signup failed. Please try again.');
    }
  }



  async getUserByUsername(username) {
    const query = `SELECT * FROM ${keyspace}.${users_table} WHERE username = ? ALLOW FILTERING`;
    const params = [username];
    const result = await client.execute(query, params, prepare);
    return result;
  }



  async createUser() {
    const query = `INSERT INTO ${keyspace}.${users_table} (username, password, user_avatar, user_id) VALUES (?, ?, ?, uuid())`;
    const params = [this.username, this.password, this.avatar];
    return await client.execute(query, params, prepare);
  }

  async updateUser(username, requested_field_to_update, new_value) {
    const existingUser = await this.getUserByUsername(username);
    if (existingUser.rowLength > 0) {
      const query = `
        UPDATE ${keyspace}.${users_table} 
        SET ${requested_field_to_update} = ? 
        WHERE 
          user_id = ?
      `;
      const params = [new_value, 'da219eec-8b0f-4237-9e46-bccb751ee390'];
      const result = await client.execute(query, params, prepare);
      return result;
    } else {
      return { message: `User Didn't Found` };
    }
  }


  async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ 
          message: 'Login failed. Please try again', 
          detailed_error: err 
        });
      }
      if (!user) {
        res.locals.message = 'Invalid username or password';
        res.redirect('/auth/login'); 
        return;
      }
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ message: 'Login failed. Please try again', detailed_error: err });
        }
        res.locals.message = `User ${user.username} logged in Successfully`;
        res.redirect('/'); 
      });
    })(req, res, next);
  }

  async logout(req, res) {
    try {
      req.logout((err) => {
        if (err) {
          console.error(err);
          res.locals.message = 'Logout failed. Please try again';
          return res.status(500).json({ message: res.locals.message });
        }
        res.clearCookie('sessionCookie');
        res.locals.message = 'Logout Successful';
        res.redirect('/');
      });
    } catch (error) {
      console.error(error);
      res.locals.message = 'Logout failed. Please try again';
      res.status(500).json({ message: res.locals.message });
    }
  }

}

module.exports = User;

