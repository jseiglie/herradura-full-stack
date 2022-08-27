const Sequelize = require("sequelize");
const db = require("../Config/config");
const User = require("./User");

const Purchases = db.define("Purchases", {
  uid: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  order: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  total: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});



module.exports = Purchases;
