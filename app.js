import express from "express";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { session } from "./config/session/session.js";
import signUpRoute from "./routes/signUp/signUpRoute.js";
import loginRoute from "./routes/login/loginRoute.js";
import joinRoute from "./routes/join/joinRoute.js";
import commentRoute from "./routes/comment/commentRoute.js";
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

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      next(err);
    }
  });
  const signedIn = req.isAuthenticated();
  const memberStatus = signedIn ? req.user.membership_status : false;
  res.render("index.html", { signedIn: signedIn, memberStatus: memberStatus });
});

app.use("/comment", commentRoute);
app.use("/signUp", signUpRoute);
app.use("/login", loginRoute);
app.use("/join", joinRoute);

app.get("/", (req, res) => {
  const signedIn = req.isAuthenticated();
  const memberStatus = signedIn ? req.user.membership_status : false;
  res.render("index.html", { signedIn: signedIn, memberStatus: memberStatus });
});

app.use((req, res) => res.send("404 not found"));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
