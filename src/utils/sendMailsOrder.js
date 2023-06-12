const ejs = require("ejs");
const path = require("path");
const transporter = require("./mailer");

const sendMail = (email, doc, attachments) => {
  transporter
    .sendMail({
      from: "neitorme@gmail.com",
      to: email,
      subject: "Factura",
      text: "Este seria el mensaje en texto plano",
      html: doc,
      attachments,
    })
    .then(() => console.log("mensaje enviado"))
    .catch((error) => console.log(error));
};

const sendWelcomeMail = async (email, data) => {
  const filePath = path.join(__dirname, "../views/order/order.ejs");
  const doc = await ejs.renderFile(filePath, data);
  
  sendMail(email, doc);
};

module.exports = {
  sendWelcomeMail,
};

// Analizas
// Resuelves
// codificas
