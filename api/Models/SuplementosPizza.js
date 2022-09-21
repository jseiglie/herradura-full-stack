const Sequelize = require("sequelize");
const db = require("../Config/config");

const SuplementosPizza = db.define("SuplementosPizza", {
  uid: {
    type: Sequelize.UUID,
    primaryKey: true,
  },
  ingredient: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  precio: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  vegano: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  disponible: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = SuplementosPizza;
