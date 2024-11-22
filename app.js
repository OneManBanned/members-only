import express from "express";
import ejs from "ejs"
import { fileURLToPath } from "url";
import { dirname } from "path";
import { session } from "./config/session/session.js";
import signUpRoute from "./routes/signUp/signUpRoute.js";
import loginRoute from "./routes/login/loginRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;

export const app = express();

app.engine("html", ejs.renderFile)

app.use(express.urlencoded({ extended: true }));
app.use(session)

app.use("/signUp", signUpRoute)
app.use("/login", loginRoute)

app.get("/", (req, res) =>
  res.send('<h1>Hello World!</h1><br><a href="/signUp" >Sign Up</a>'),
);
app.use((req, res) => res.send("404 not found"))

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
