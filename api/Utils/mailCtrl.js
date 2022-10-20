const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// email sender function

exports.sendEmail = async (req, res) => {
  const myOAuth2Client = new OAuth2(
    "1021350975294-gh9euoeata83oursv2c9417kcqoa7l8b.apps.googleusercontent.com",
    "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"
  );
  myOAuth2Client.setCredentials({
    refresh_token:
      "1//040htGTqtyCPFCgYIARAAGAQSNwF-L9Ir4W8auRrlrxiJ1z6Y0bfRmY_U0SfKw_3nH1ur0H0NKA-q_DmksPbFZFpOBy3PVpJBmvw",
  });
  const myAccessToken = myOAuth2Client.getAccessToken();

  //
  const data = req.body.order;
  console.log("email client data", data)
  let el;
  let arr = "";
  for (el in data) {
    //console.log(el);
    arr += "<li>" + data[el] + "</li>";
  }
  const toClient = {
    from: "La herradura Vinoteca",
    to: req.body.mail,
    bcc: "pedidos.laherraduravinoteca@gmail.com",
    subject: `Pedido ${req.body.referencia} realizado satisfactoriamente en La Herradura Vinoteca`,
    html: `<h1>***Resumen***</h1><p>Hola ${req.body.name? req.body.name : req.body.mail}! Se ha recibido correctamente el pedido realizado, los datos del mismo a continuación:<p/><h3>*Detalles*</h3><ul>${arr}</ul><br></br><h4>Número de referencia de su pedido: ${req.body.referencia}</h4><h4>A nombre de: ${req.body.name? req.body.name : req.body.mail}</h4><h4>Email: ${req.body.mail}</h4><h4>Total: ${req.body.total}€</h4>Agradecemos su preferencia! <br></br> La Herradura Vinoteca`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: "pedidos.laherraduravinoteca@gmail.com",
      clientId:
        "1021350975294-gh9euoeata83oursv2c9417kcqoa7l8b.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//040htGTqtyCPFCgYIARAAGAQSNwF-L9Ir4W8auRrlrxiJ1z6Y0bfRmY_U0SfKw_3nH1ur0H0NKA-q_DmksPbFZFpOBy3PVpJBmvw",
      accessToken: myAccessToken,
    },
  });

  let info = await transporter.sendMail(toClient, (err, info) => {
    if (err) {
      return console.log(err);
    }
  });
  console.log("URL del mensaje", nodemailer.getTestMessageUrl(info));
  res.send(toClient);
};

exports.sendherradura = async (req, res) => {
  const myOAuth2Client = new OAuth2(
    "1021350975294-gh9euoeata83oursv2c9417kcqoa7l8b.apps.googleusercontent.com",
    "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"
  );
  myOAuth2Client.setCredentials({
    refresh_token:
      "1//040htGTqtyCPFCgYIARAAGAQSNwF-L9Ir4W8auRrlrxiJ1z6Y0bfRmY_U0SfKw_3nH1ur0H0NKA-q_DmksPbFZFpOBy3PVpJBmvw",
  });
  const myAccessToken = myOAuth2Client.getAccessToken();

  //
  const data = req.body.order;
  let el;
  let arr = "";
  for (el in data) {
    console.log(el);
    arr += "<li>" + data[el] + "</li>";
  }
  const toClient = {
    from: "La herradura Vinoteca",
    to: "pedidos.laherraduravinoteca@gmail.com",
    subject: `Pedido PAGADO ${req.body.referencia} realizado satisfactoriamente en La Herradura Vinoteca`,
    html: `<h3>Pedido a nombre de ${req.body.name? req.body.name : req.body.mail} para recoger en La Herradura Vinoteca</h3><p>Detalles del pedido:<p/><ul>${arr}</ul>`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: "pedidos.laherraduravinoteca@gmail.com",
      clientId:
        "1021350975294-gh9euoeata83oursv2c9417kcqoa7l8b.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//040htGTqtyCPFCgYIARAAGAQSNwF-L9Ir4W8auRrlrxiJ1z6Y0bfRmY_U0SfKw_3nH1ur0H0NKA-q_DmksPbFZFpOBy3PVpJBmvw",
      accessToken: myAccessToken,
    },
  });

  let info = transporter.sendMail(toClient, (err, info) => {
    if (err) {
      return console.log(err);
    }
  });
  console.log("URL del mensaje", nodemailer.getTestMessageUrl(info));
  res.send(toClient);
};