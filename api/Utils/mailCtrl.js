const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// email sender function

exports.sendEmail = async (req, res) => {
    const myOAuth2Client = new OAuth2(
        "1014243940488-u8q3i8e92hr36g6nbclgk423krs7d636.apps.googleusercontent.com",
        "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"
      );
      myOAuth2Client.setCredentials({
        refresh_token:
          "1//04wiPgQo1yx_ECgYIARAAGAQSNwF-L9IrXqXDMSLFRJMZUkpJZAnSm8IAkNlewlRLhXgs8f-0UqZRD1Bz7ucJq4mpnceAJFWsJeQ",
      });
      const myAccessToken = myOAuth2Client.getAccessToken()
  
;
  

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
    to: req.body.mail,
    bcc: "herraduravinoteca@gmail.com",
    subject: `Pedido ${req.body.referencia} realizado satisfactoriamente en La Herradura Vinoteca`,
    html: `<h3>Pedido para recoger en La Herradura Vinoteca</h3><p>Hola ${req.body.name}! Se ha recibido correctamente el pedido realizado, los datos del mismo a continuación:<p/><ul>${arr}</ul><br></br>Agradecemos su preferencia! <br></br> La Herradura Vinoteca`,
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: "herraduravinoteca@gmail.com",
      clientId:
        "1014243940488-u8q3i8e92hr36g6nbclgk423krs7d636.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04wiPgQo1yx_ECgYIARAAGAQSNwF-L9IrXqXDMSLFRJMZUkpJZAnSm8IAkNlewlRLhXgs8f-0UqZRD1Bz7ucJq4mpnceAJFWsJeQ",
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
