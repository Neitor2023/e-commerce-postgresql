// importar los modelos
const Users = require("./users.model");
const Products = require("./products.model");
const ProductInOrders = require("./productInOrders.model");
const Orders = require("./orders.model");
const ProductInCars = require("./productInCars.model");
const Cars = require("./cars.model");

const initModels = () => {
  // Ref: "users"."id" < "products"."user_id"
  Products.belongsTo(Users, { foreignKey: "userId" });
  Users.hasMany(Products, { foreignKey: "userId" });

  // Ref: "products"."id" < "ProductInOrder"."product_id"
  ProductInOrders.belongsTo(Products, { foreignKey: "productId" });
  Products.hasMany(ProductInOrders, { foreignKey: "productId" });

  // Ref: "Order"."id" < "ProductInOrder"."order_id"
  ProductInOrders.belongsTo(Orders, { foreignKey: "orderId" });
  Orders.hasMany(ProductInOrders, { foreignKey: "orderId" });

  // Ref: "products"."id" < "ProductInCart"."product_id"
  ProductInCars.belongsTo(Products, { foreignKey: "productId" });
  Products.hasMany(ProductInCars, { foreignKey: "productId" });

  // Ref: "users"."id" < "Order"."user_id"
  Orders.belongsTo(Users, { foreignKey: "userId" });
  Users.hasMany(Orders, { foreignKey: "userId" });

  // Ref: "users"."id" < "car"."user_id"
  Cars.belongsTo(Users, { foreignKey: "userId" });
  Users.hasMany(Cars, { foreignKey: "userId" });

  // Ref: "car"."id" < "ProductInCart"."car_id"
  ProductInCars.belongsTo(Cars, { foreignKey: "carId" });
  Cars.hasMany(ProductInCars, { foreignKey: "carId" });
};

module.exports = initModels;
// Un usuario tine un rol? 1 (belongsTo)
// Un rol lo pueden tener muchos? Muchos (hasMany)
// 1 - M
