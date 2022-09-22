const https = require("https")
const express = require("express");
const app = express();
const db = require("./Config/config");
const Menu = require("./Models/Menu")
const User = require("./Models/User")
const Categories = require("./Models/Categories")
const Purchases = require("./Models/Purchases");
const sequelize = require("sequelize");
const port = process.env.PORT || 3001; 
const bodyParser = require("body-parser")
const stripe = require("stripe")("sk_test_51Jub2MIPsB2uwGnPOurLHKAxmB74El9WIV0njLJ0DvE0tFHBXWZSgFcX0Qby5eldGpv0WLWU2ugTaiCYuEUdn3kJ006iBSaVDp")
const cors = require("cors")
const uuid = require("uuid").v4
const dotenv = require("dotenv")
 

app.use(express.json());
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

//Route
app.use("/api", require("./Routes/herradura.routes"))

//test
try {
  db.authenticate().then(() => console.log("db connected"));
} catch (error) {
  console.error(error);
}

//Relationship
User.hasMany(Purchases, {foreignKey: "id_User"})
Purchases.belongsTo(User)
Categories.hasMany(Menu, {foreignKey: "id_catego1"})
Categories.hasMany(Menu, {foreignKey: "id_catego2"})
Menu.belongsTo(Categories)


db.sync({}).then(()=>{}).catch((error)=>console.log(error))

app.listen(process.env.PORT || port, () => {
  console.log("app up on port: " + port);
});
 
// https.createServer(app).listen(process.env.PORT || port, ()=>{
//   console.log("SERVER up on port: " + port);
// })