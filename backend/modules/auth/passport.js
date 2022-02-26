const passport = require("passport");
const bcrypt = require("bcrypt");

const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");

const { db } = require("../../db");

const verifyPassword = async (password, hashPassword) => {
  const result = await bcrypt.compare(password, hashPassword);
  return result;
};

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) return done(null, false, { message: "Incorrect email." });
    const flag = await verifyPassword(password, user.password);
    if (!flag) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy(customFields, verifyCallback));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "test123",
};

const jwtCallback = async (payload, done) => {
  console.log(payload);
  const user = await db.User.findOne({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    done(null, false, { error: "Unauthorized" });
    return;
  } else {
    let userData = { id: user.id, username: user.username };
    done(null, userData);
  }
};

passport.use(new JwtStrategy(opts, jwtCallback));
