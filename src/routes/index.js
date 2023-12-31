// const postRoutes = require("./posts.routes");
const userRoutes = require("./users.routes");
const productsRoutes = require("./products.routes");
const carsRoutes = require("./cars.routes");
const ordersRoutes = require("./orders.routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");

// recibe como parametro una instancia de express
const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(productsRoutes);
  app.use(carsRoutes);
  app.use(ordersRoutes);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = apiRoutes;
