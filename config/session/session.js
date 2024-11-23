import pool from "../db/pool.js";
import expressSession from "express-session";
import connectPg from "connect-pg-simple";

const postgresStore = new connectPg(expressSession);

export const session = expressSession({
    store: new postgresStore({
        pool: pool,
    }),
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
});
