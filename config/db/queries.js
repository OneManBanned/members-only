import pool from "./pool.js";

const db = {
    insertUser: async function(firstname, lastname, email, hash, salt) {
        await pool.query(
            "INSERT INTO users (firstname, lastname, email, hash, salt) VALUES ($1, $2, $3, $4, $5)",
            [firstname, lastname, email, hash, salt],
        );
    },

    findUserByEmail: async function(email) {
        return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    },

    findUserById: async function(user_id) {
        return await pool.query("SELECT * FROM users WHERE user_id = $1", [
            user_id,
        ]);
    },

    updateUserMembership: async function(membership_status, user_id) {
        await pool.query(
            "UPDATE users SET membership_status = $1 WHERE user_id = $2",
            [membership_status, user_id],
        );
    },
};

export default db;
