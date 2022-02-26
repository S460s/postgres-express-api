const fs = require("fs");
const path = require("path");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("postgres://tester:asd@database/tester");

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL established.");
  } catch (err) {
    console.log("Error while trying to connect to PostgreSQL ", err);
  }
};

const sync = async (force = false, alter = false) => {
  try {
    await sequelize.sync({ force, alter });
    console.log("Tables are synced.");
  } catch (err) {
    console.log("Error while trying to sync tables", err);
  }
};

const db = {};

const injectDB = () => {
  const modelsPath = `${__dirname}/models`;

  fs.readdirSync(modelsPath).forEach((file) => {
    if (file.indexOf(".") !== 0 && file.slice(-3) === ".js") {
      const model = require(path.join(modelsPath, file))(sequelize, DataTypes);
      db[model.name] = model;
    }
  });
};

injectDB();

module.exports = { auth, sync, db };
