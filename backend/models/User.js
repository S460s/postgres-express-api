const User = (sequelize, DataTypes) => {
  const user = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return user;
};

module.exports = User;
