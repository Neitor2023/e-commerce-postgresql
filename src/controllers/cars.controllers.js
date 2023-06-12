const Cars = require("../models/cars.model");
const Products = require("../models/products.model");
const ProductinCars  = require("../models/productInCars.model");
const { Op } = require("sequelize");

const addCar = async (req, res, next) => {
  try {
    const { userId } = req.params;    
    const { productId, quantity, price } = req.body;
    const car = await Cars.findOne({
      where: { userId },
    });
    
    const productinCars = await ProductinCars.findOne({
      where: {
        [Op.and]: [{ carId: car.id }, { productId }, { status: false }],
      }
    });
    
    if (productinCars) {

      let antTotalPrice = (quantity * price) + car.totalPrice;
      let antquantity = productinCars.quantity + quantity;
      await car.update({totalPrice:antTotalPrice});
      await productinCars.update({quantity:antquantity, price:price})

    } else {
      await ProductinCars.create({carId:car.id, productId, quantity, price});
      let antTotalPrice = (quantity * price) + car.totalPrice;
      await car.update({totalPrice:antTotalPrice})
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
};

const findAllCars = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const car = await Cars.findOne({
      where: { userId },
      include: [
        {
          model: ProductinCars,
          include: [
            {
              model: Products,
              attributes: ['name', 'description', 'productImage'],
            },
          ],    
        },
      ],

    });
    res.json(car);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCar,
  findAllCars,
};
