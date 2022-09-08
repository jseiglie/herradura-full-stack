const express = require("express");
const router = express.Router();
const db = require("../Config/config");
const Menu = require("../Models/Menu");
const User = require("../Models/User");
const Purchase = require("../Models/Purchases");
const Purchases = require("../Models/Purchases");
const Categories = require("../Models/Categories");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/authmiddleware");

const stripe = require("stripe")(
  "sk_test_51Jub2MIPsB2uwGnPOurLHKAxmB74El9WIV0njLJ0DvE0tFHBXWZSgFcX0Qby5eldGpv0WLWU2ugTaiCYuEUdn3kJ006iBSaVDp"
);
const { Op } = require("sequelize");

//Menu
router.get("/menu", async (req, res) => {
  try {
    const resp = await Menu.findAll({ where: { disponible: true } });
    res.json(resp);
  } catch (error) {
    console.error(`Error al pedir el menu: ${error}`);
  }
});

//Destacados
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
    });
    res.json({ msg: `Se ha modificado correctamente el plato: ${plato}` });
  } catch (error) {
    console.error(`Error al modificar el plato: ${error}`);
    res.sendStatus(400);
  }
});

//disponible toggler
router.patch("/menuDisponible/:id", async (req, res) => {
  try {
    const id = req.params.id;
  } catch (error) {
    console.error(`Error al habilitar el plato: ${error}`);
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
router.post("addCategory", async (req, res) => {
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
    await Categories.update(
      {
        catego: catego,
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
//Purchases by Client
router.get("/purchasesByClient", async (req, res) => {
  try {
  } catch (error) {
    console.error(`Error al pedir todas las compras: ${error}`);
    res.sendStatus(400);
  }
});

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

// router.post("/checkout", async (req, res) => {
//   console.log("Request:", req.body);

//   let error;
//   let status;
//   try {
//     const { product, token } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const idempotency_key = uuid();
//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: "eur",
//         customer: customer.id,
//         receipt_email: token.email,
//         description: `Purchased the ${product.name}`,
//         shipping: {
//           name: token.card.name,
//           address: {
//             line1: token.card.address_line1,
//             line2: token.card.address_line2,
//             city: token.card.address_city,
//             country: token.card.address_country,
//             postal_code: token.card.address_zip,
//           },
//         },
//       },
//       {
//         idempotency_key,
//       }
//     );
//     console.log("Charge:", { charge });
//     status = "success";
//   } catch (error) {
//     console.error("Error:", error);
//     status = "failure";
//   }

//   res.json({ error, status });
// });

//stripe from web

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
