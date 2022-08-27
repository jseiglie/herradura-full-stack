const Sequelize = require("sequelize")

module.exports = new Sequelize("herradura", "root", "", {
    host: "localhost",
    dialect: "mysql",
    operatorAliases: false, 
})