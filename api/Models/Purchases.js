const Sequelize = require("sequelize");
const db = require("../Config/config");

const Purchases = db.define("Purchases", {
  uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  referencia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  mail:{
    type: Sequelize.STRING,
    allowNull: true,
  },
  order: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  completed:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
});

module.exports = Purchases;
