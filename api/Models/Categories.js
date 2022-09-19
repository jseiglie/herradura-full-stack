const Sequelize = require("sequelize");
const db = require("../Config/config");

const Categories = db.define("Categories", {
    uid: {
        type: Sequelize.UUID,
        primaryKey: true,
    },
    catego: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      delivery:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
})  

module.exports = Categories 