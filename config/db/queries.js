import pool from "./pool.js";

const db = {
  insertUser: async function (firstname, lastname, email, hash, salt, isAdmin) {
    await pool.query(
      "INSERT INTO users (firstname, lastname, email, hash, salt, isadmin) VALUES ($1, $2, $3, $4, $5, $6)",
      [firstname, lastname, email, hash, salt, isAdmin],
    );
  },

  findUserByEmail: async function (email) {
    return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  },

  findUserById: async function (user_id) {
    return await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
  },

  updateUserMembership: async function (membership_status, user_id) {
    await pool.query(
      "UPDATE users SET membership_status = $1 WHERE user_id = $2",
      [membership_status, user_id],
    );
  },

  createMessage: async function (title, message, author, timestamp) {
    await pool.query(
      "INSERT INTO messages (title, message, author, timestamp) VALUES ($1, $2, $3, $4)",
      [title, message, author, timestamp],
    );
  },

  findMessages: async function () {
    return await pool.query(
      "SELECT firstname, lastname, timestamp, title, message, message_id FROM messages INNER JOIN users ON messages.author = users.user_id",
    );
  },

    deleteMessage: async function (id) {
        await pool.query('DELETE FROM messages WHERE message_id = $1', [id])
    }
};

export default db;
