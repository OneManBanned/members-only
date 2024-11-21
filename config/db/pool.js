import pkg from "pg";

const { Pool } = pkg; 

const pool = new Pool({
    connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@localhost:5432/${process.env.DATABASE}`
});

export default pool;
