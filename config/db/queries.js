import pool from "./pool.js";

const db = {
    insertUser: async function(firstname, lastname, email, hash, salt ) {
        await pool.query(
            "INSERT INTO users (firstname, lastname, email, hash, salt) VALUES ($1, $2, $3, $4, $5)",
            [firstname, lastname, email, hash, salt],
        );
    },

    findUserByEmail: async function(email) {
        return await pool.query("SELECT * FROM users WHERE email = $1", [email])
    },

    findUserById: async function(user_id) {
        return await pool.query("SELECT * FROM users WHERE user_id = $1", [user_id]);
    },
};

export default db;
