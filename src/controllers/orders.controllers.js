const Users = require("../models/users.model");
const Products = require("../models/products.model");
const Orders = require("../models/orders.model");
const ProductinCars = require("../models/productInCars.model");
const ProductInOrders = require("../models/productInOrders.model");
const Cars = require("../models/cars.model");
const { sendWelcomeMail } = require("../utils/sendMailsOrder");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const addOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cars = await Cars.findOne({
      where: { userId },
    });

    const orders = await Orders.findOne({
      where: { userId },
    });

    let sw = true
    while (sw) {
      let productinCars = await ProductinCars.findOne({
        where: {
          [Op.and]: [{ carId: cars.id }, { status: false }],
        }
      });

      if (productinCars) {

        await ProductInOrders.create({ orderId: orders.id, productId: productinCars.productId, quantity: productinCars.quantity, price: productinCars.price });
        let antTotalPrice = orders.totalPrice
        await orders.update({ status: false, totalPrice: productinCars.price * productinCars.quantity + antTotalPrice })
        await productinCars.update({ status: true })

      } else {
        sw = false
        cars.update({ totalPrice: 0 });
      }
    }

    res.json(orders);
  } catch (error) {
    next(error);
  }

};

const findAllOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Orders.findOne({
      where: { userId },
    });

    const productInOrders = await ProductInOrders.findAll({
      where: {
        [Op.and]: [{ orderId: orders.id }, { status: false }],
      },
      include: [
        {
          model: Products,
          attributes: ['name', 'description', 'productImage'],
        },
      ],
    });

    res.json(productInOrders);
  } catch (error) {
    next(error);
  }
};

const buyOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const orders = await Orders.findOne({
      where: { userId },
    });

    const user = await Users.findOne({
      where: { id: userId },
    });
    const { username, email } = user;
    const totalOrderPrice = orders.totalPrice;
    let product0 = "";
    let product1 = "";
    let product2 = "";
    let product3 = "";
    let product4 = "";
    let product5 = "";
    let product6 = "";
    let product7 = "";
    let product8 = "";
    let product9 = "";
    let quantity0 = 0;
    let quantity1 = 0;
    let quantity2 = 0;
    let quantity3 = 0;
    let quantity4 = 0;
    let quantity5 = 0;
    let quantity6 = 0;
    let quantity7 = 0;
    let quantity8 = 0;
    let quantity9 = 0;
    let price0 = 0;
    let price1 = 0;
    let price2 = 0;
    let price3 = 0;
    let price4 = 0;
    let price5 = 0;
    let price6 = 0;
    let price7 = 0;
    let price8 = 0;
    let price9 = 0;
    let sw = true
    let ct = -1
    while (sw) {
      ct = ct + 1;
      let productinorders = await ProductInOrders.findOne({
        where: {
          [Op.and]: [{ orderId: orders.id }, { status: false }],
        }
      });

      if (productinorders) {
        let products = await Products.findByPk(productinorders.productId, {});
        if (products) {
          await products.update({ availableQty: products.availableQty - productinorders.quantity })
          let difference = products.availableQty - productinorders.quantity;
          if (difference < 1) {
            await products.update({ status: false })
          }

          await productinorders.update({ status: true })
          await orders.update({
            status: true,
            totalPrice: 0
          })
        }
        switch (ct) {
          case 0:
            product0 = products.name;
            quantity0 = productinorders.quantity;
            price0 = productinorders.price;
          case 1:
            product1 = products.name;
            quantity1 = productinorders.quantity;
            price1 = productinorders.price;
          case 2:
            product2 = products.name;
            quantity2 = productinorders.quantity;
            price2 = productinorders.price;
          case 3:
            product3 = products.name;
            quantity3 = productinorders.quantity;
            price3 = productinorders.price;
          case 4:
            product4 = products.name;
            quantity4 = productinorders.quantity;
            price4 = productinorders.price;
          case 5:
            product5 = products.name;
            quantity5 = productinorders.quantity;
            price5 = productinorders.price;
          case 6:
            product6 = products.name;
            quantity6 = productinorders.quantity;
            price6 = productinorders.price;
          case 7:
            product7 = products.name;
            quantity7 = productinorders.quantity;
            price7 = productinorders.price;
          case 8:
            product8 = products.name;
            quantity8 = productinorders.quantity;
            price8 = productinorders.price;
          case 9:
            product9 = products.name;
            quantity9 = productinorders.quantity;
            price9 = productinorders.price;
        }

      } else {
        sw = false
      }
    }

    sendWelcomeMail(email, {
      username, email, orderId: orders.id, totalOrderPrice,
      product0, product1, product2, product3, product4, product5, product6, product7, product8, product9,
      quantity0, quantity1, quantity2, quantity3, quantity4, quantity5, quantity6, quantity7, quantity8, quantity9,
      price0, price1, price2, price3, price4, price5, price6, price7, price8, price9,
    });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addOrders,
  findAllOrders,
  buyOrders,
};
