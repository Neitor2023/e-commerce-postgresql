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
    const order = await Orders.findOne({
      where: { userId },
      include: [
        {
          model: ProductInOrders,
          include: [
            {
              model: Products,
              attributes: ['name', 'description', 'productImage'],
            },
          ],    
        },
      ],
    });
    res.json(order);
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
    const factu = {
      product: [],
      total: 0
    };    
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
        let nuevoProducto = {
          quantity: productinorders.quantity,
          name: products.name,
          price: productinorders.price,
          subtot: productinorders.quantity * productinorders.price
        };
        factu.product.push(nuevoProducto);

      } else {
        sw = false
      }
    }

    factu.product.forEach(produc => {
      factu.total += produc.quantity * produc.price;
    });
    
    sendWelcomeMail(email, {
      username, email, orderId: orders.id, totalOrderPrice,factu
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
