const express = require("express");
const cors = require("cors");
require("dotenv").config();
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/errors.routes");
const initModels = require("./models/initModels");
const db = require("./utils/database");

initModels();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
db.authenticate() // es uan funcion asincrona
    .then(()=> console.log('Base de dato conectada'))
    .catch((err) => console.log(err));

// ? Si no existe la tabla la crea
// * alter: true -> compara tablas y columnas y si encuentra diferencias las modifica
// ! force: true -> borra la información y todas las tablas y las crea de nuevo
db.sync()
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch(error => console.log(error));

app.get("/", (req, res) => {
  res.send("Servidor trabajando OK");
});

// agrupar todas las rutas en un archivo
apiRoutes(app);
errorRoutes(app);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Organizar los archivos para empezar con nuestros eps

// TODO les voy a dar las especificacones al estilo de una prueba tecnica

// instalar dbeaver??
