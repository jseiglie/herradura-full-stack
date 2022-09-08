const Sequelize = require("sequelize");
const db = require("../Config/config");


const User = db.define("User", {
  uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: "",
    allowNull: true,
  },
  lastname: {
    type: Sequelize.STRING,
    defaultValue: "",
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    defaultValue: "",
    allowNull: true,
  },
  zip: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});



module.exports = User;
