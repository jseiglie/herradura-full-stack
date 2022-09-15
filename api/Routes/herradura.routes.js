const express = require("express");
const router = express.Router();
const db = require("../Config/config");
const Menu = require("../Models/Menu");
const User = require("../Models/User");
const Purchases = require("../Models/Purchases");
const Categories = require("../Models/Categories");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/authmiddleware");
const Mail = require("../Utils/mailCtrl")
const stripe = require("stripe")(
  "sk_test_51Jub2MIPsB2uwGnPOurLHKAxmB74El9WIV0njLJ0DvE0tFHBXWZSgFcX0Qby5eldGpv0WLWU2ugTaiCYuEUdn3kJ006iBSaVDp"
);
const { Op } = require("sequelize");

//Menu disponible
router.get("/menuDisponible", async (req, res) => {
  try {
    const resp = await Menu.findAll({ where: { disponible: true } });
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir el menu: ${error}`);
  }
});

router.get("/menu", async (req, res) => {
  try {
    const resp = await Menu.findAll();
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir el menu: ${error}`);
  }
});

//Destacados limited
router.get("/destacados", async (req, res) => {
  try {
    const resp = await Menu.findAll({
      where: { destacado: true, precio: { [Op.gt]: 6 } },
      limit: 4,
    });
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});
router.get("/destacadosall", async (req, res) => {
  try {
    const resp = await Menu.findAll({ where: { destacado: true } });
    res.send(resp);
  } catch (error) {
    console.log(error);
  }
});
//Menu vegano
router.get("/vegano", async (req, res) => {
  try {
    const resp = await Menu.findAll({ where: { vegano: true } });
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir el menu vegano: ${error}`);
    res.sendStatus(400);
  }
});

//add to Menu
router.post("addToMenu", async (req, res) => {
  try {
    const payload = req.body;
    await Menu.create(payload);
    res.json(payload);
  } catch (error) {
    console.error(`Error al pedir añadir al menu: ${error}`);
    res.sendStatus(400);
  }
});

//get One Menu item

router.get("/oneItem/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Menu.findByPk(id);
    res.json(resp);
  } catch (error) {
    res.json({ error: error });
  }
});

//modify Menu
router.put("/modMenu/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { plato, descripcion, precio, vegano, disponible } = req.body;
    await Menu.update({
      plato: plato,
      descripcion: descripcion,
      precio: precio,
      vegano: vegano,
      disponible: disponible,
    }, {where: {
      uid: id
    }});
    res.json({ msg: `Se ha modificado correctamente el plato: ${plato}` });
  } catch (error) {
    console.error(`Error al modificar el plato: ${error}`);
    res.sendStatus(400);
  }
});

router.put("/modPrecio/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { precio } = req.body;
    await Menu.update({ precio: precio }, { where: { uid: id } });
  } catch (error) {
    console.log(error);
  }
});

//disponible toggler
router.put("/menuDisponible/:id", async (req, res) => {
  const id = req.params.id;
  const { disponible } = req.body;
  try {
    await Menu.update(
      {
        disponible: disponible,
      },
      {
        where: { uid: id },
      }
    );
    res.send({ msg: "Se ha actualizado correctamente la disponibilidad" });
  } catch (error) {
    console.error(`Error al modificar disponibilidad: ${error}`);
    res.sendStatus(400);
  }
});

//destacar toggler
router.put("/destacar/:id", async (req, res) => {
  const id = req.params.id;
  const { destacada } = req.body;
  try {
    Menu.update(
      {
        destacado: destacada,
      },
      {
        where: {
          uid: id,
        },
      }
    );
    res.send({ msg: "actualizado" });
  } catch (error) {
    console.error(`Error al destacar el plato: ${error}`);
    res.sendStatus(400);
  }
});

//delete Menu
router.delete("/delMenu/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Menu.destroy({
      where: { id: id },
    });
    res.json({ msg: `Se ha eliminado el plato correctamente` });
  } catch (error) {
    console.error(`Error al eliminar el plato: ${error}`);
    res.sendStatus(400);
  }
});

//Categories
router.get("/categories", async (req, res) => {
  try {
    const resp = await Categories.findAll({ where: { delivery: true } });
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir todas las categorías: ${error}`);
    res.sendStatus(400);
  }
});

//One Category
router.get("/bycategory/:id", async (req, res) => {
  const id = req.params.id;
  const resp = await Menu.findAll({ where: { id_catego2: id } });
  res.send(resp);
});
//add catego
router.post("/addCategory", async (req, res) => {
  try {
    const payload = req.body; 
    await Categories.create(payload);
    res.json(payload);
  } catch (error) {
    console.error(`Error al añadir una categoría: ${error}`);
    res.sendStatus(400);
  }
});

//modify catego
router.put("/editCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { catego } = req.body;
    await User.update(
      {
        id_catego2: catego,
      },
      { where: { id: id } }
    );
    res.json({ msg: "Se ha modificado correctamente la categoría" });
  } catch (error) {
    console.error(`Error al modificar una categoría: ${error}`);
    res.sendStatus(400);
  }
});

//delete category
router.delete("/delCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Categories.destroy({
      where: { id: id },
    });
    res.json({ msg: "Se ha eliminado correctamente la categoría" });
  } catch (error) {
    console.error(`Error al eliminar una categoría: ${error}`);
    res.sendStatus(400);
  }
});

//AllUsers
router.get("/allUsers", async (req, res) => {
  try {
    const resp = await User.findAll();
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir todos los usuarios: ${error}`);
    res.sendStatus(400);
  }
});

//get One User
router.get("/oneUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await User.findByPk(id);
    res.send(resp);
  } catch (error) {
    console.error(`Error al pedir un usuario: ${error}`);
    res.sendStatus(400);
  }
});

// //add user
// router.post("/register", async (req, res) => {
//   try {
//     const { name, lastname, email, password, address, zip } = req.body;
//     bcrypt.hash(password, 8).then((hash) => {
//       User.create({
//         name: name,
//         lastname: lastname,
//         email: email,
//         password: hash,
//         address: address,
//         zip: zip,
//       });
//     });

//     res.json({ msg: `Se ha añadido correctamente el usuario ${name}` });
//   } catch (error) {
//     console.error(`Error al registrar un usuario: ${error}`);
//     res.sendStatus(400);
//   }
// });

//Delete User
router.delete("/delUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id: id } });
    res.json({ msg: `Se ha eliminado correctamente el usuario con id: ${id}` });
  } catch (error) {
    console.error(`Error al eliminar el usuario: ${error}`);
    res.sendStatus(400);
  }
});

//modify user
router.put("/modUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lastname, email, address, zip } = req.body;
    await User.update(
      {
        name: name,
        lastname: lastname,
        email: email,
        address: address,
        zip: zip,
      },
      { where: { id: id } }
    );
    res.json({ msg: `Se ha modificado correctamente el usuario ${name}` });
  } catch (error) {
    console.error(`Error al modificar el usuario: ${error}`);
    res.sendStatus(400);
  }
});

//Purchases All
router.get("/purchases", async (req, res) => {
  try {
    const resp = await Purchases.findAll();
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir todas las compras: ${error}`);
    res.sendStatus(400);
  }
});
//Purchases by referencia
router.get("/purchases/:referencia", async (req, res) => {
  const {referencia} = req.params
  try {
    const resp = await Purchases.findOne({where: {referencia: referencia}}
      )
      res.json(resp)
  } catch (error) {
    console.error(`Error al pedir todas las compras: ${error}`);
    res.sendStatus(400);
  }
});
//new purchase
router.post("/neworder", async (req, res)=>{
  const {data, number, total} = req.body
  
  let temp = []
  let backprice
  data.forEach(element => {
    temp.push(element.precio)
    backprice = (temp.reduce((a,b)=>a+b)).toFixed(2)
  });

  if (total === backprice) {
   const resp = await Purchases.create({
    referencia: number,
    order: JSON.stringify(data),
    total: backprice
   })
  
  res.json(resp)
}
else {
  res.json({error: "no coincide"})
}
})

//complete purchase
router.put("/complete/:referencia", async (req, res)=>{
  const {referencia} = req.params
  const {name, mail, completed} = req.body
  try {
    const resp = Purchases.update({
      name: name,
      mail: mail,
      completed: completed
    },{where: {referencia: referencia}})
  } catch (error) {
    res.json({error: error})
  }
})

router.post("/sendmail", Mail.sendEmail)

//admin
router.post("/admin", async (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") res.json({ error: "Faltan datos" });
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.json({ error: "usuario no existe" });
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Usuario y / o contraseña incorrecta" });
    if (match) {
      console.log(`Se ha conectado ${user}`);
      const token = sign(
        {
          user: User.email,
          uid: User.uid,
          name: User.name,
          lastname: User.lastname,
          address: User.address,
          zip: User.zip,
          admin: User.admin,
        },
        // process.env.NODE_ENV_SECRET
        "DbmyStxumC"
      );
      res.json({ token: token, admin: user.admin });
    }
  });
});

//REGISTER

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 8).then((hash) => {
    User.create({
      email: email,
      password: hash,
    });
    res.json("Usuario creado");
  });
});

//checks for validToken
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

const calculateOrderAmount = (items) => {
  let temp =[];
 let backprice = ""

 //console.log("before foreach", items)
 items.items.forEach(element => {
  temp.push(element.precio)
 // console.log("temp ", temp)
  backprice = (temp.reduce((a,b)=>a+b)).toFixed(2)
});
console.log(backprice)

  return backprice*100;
} 
      
router.post("/create-payment-intent", async (req, res) => {
  const items  = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur"
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  }); 
});
module.exports = router; 
