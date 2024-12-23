import express from "express";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { session } from "./config/session/session.js";
import signUpRoute from "./routes/signUp/signUpRoute.js";
import loginRoute from "./routes/login/loginRoute.js";
import manageMemberRoute from "./routes/manageMember/manageMemberRoute.js";
import messageRoute from "./routes/message/messageRoute.js";
import indexRoute from "./routes/indexRoute.js";
import logoutRoute from "./routes/logoutRoute.js";
import deleteRoute from "./routes/deleteRoute.js";
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

export const app = express();

app.engine("html", ejs.renderFile);

app.use(express.urlencoded({ extended: true }));

app.use(session);
import "./config/passport/passport.js";

app.use(passport.initialize());
app.use(passport.session());

app.use("/delete", deleteRoute)
app.use("/logout", logoutRoute)
app.use("/message", messageRoute);
app.use("/signUp", signUpRoute);
app.use("/login", loginRoute);
app.use("/manageMember", manageMemberRoute);
app.use("/", indexRoute);

app.use((req, res) => res.send("404 not found"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.statusCode);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
