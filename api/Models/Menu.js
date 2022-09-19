const Sequelize = require("sequelize");
const db = require("../Config/config");

const Menu = db.define("Menu", {
  uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  plato: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descripcion: {
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
  destacado: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});


module.exports = Menu;
