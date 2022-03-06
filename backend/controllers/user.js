const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');

const {
  db: { User },
} = require('../db');

const getUsers = async (req, res) => {
  console.log(User.name);
  const users = await db.User.findAll();
  res.json(users);
};

const signup = async function (req, res, next) {
  const email = req.body.email;
  const isUsed = await User.findOne({ where: { email } });
  if (isUsed) return res.json({ err: 'this email is already in use' });

  const salt = await bcrypt.genSalt();

  const password = await bcrypt.hash(req.body.password, salt);
  console.log(password);
  const user = User.create({
    username: req.body.username,
    email,
    password,
    role: req.body.role,
  });

  const token = jwt.sign({ email, username: user.username }, 'test123');

  res.json({ ok: true, token });
};

const login = function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (user) {
      const token = jwt.sign({ email: user.email }, 'test123');
      res.json({ token, ok: true });
    } else {
      res.json({ ok: false });
    }
  })(req, res);
};

const getProfile = async function (req, res) {
  console.log(req.user);
  const user = await User.findByPk(req.user.id);
  res.json({
    ok: true,
    user: { email: user.email, username: user.username, role: user.role },
  });
};

module.exports = {
  getUsers,
  signup,
  login,
  getProfile,
};
