import passport from "passport";
import localStrategy from "passport-local";
import db from "../../config/db/queries.js";
import { validatePassword } from "../../libs/passportUtils.js"

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await db.findUserByName(username);

    const user = rows[0];

    if (!user) return done((null, false));

    const isValid = ValidatePassword(password, user.hash, user.salt);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new localStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const { rows } = await db.findUserById(userId);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
