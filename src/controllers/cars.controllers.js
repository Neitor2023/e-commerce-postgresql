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

      await productinCars.increment({'quantity': 1});
      const productincars = await ProductinCars.findOne({
        where: {
          [Op.and]: [{ carId: car.id }, { productId }, { status: false }],
        }    
      });
      let antTotalPrice = car.totalPrice;
      await car.update({totalPrice:productincars.price * productincars.quantity + antTotalPrice})
    } else {
      await ProductinCars.create({carId:car.id, productId, quantity, price});
      let antTotalPrice = car.totalPrice;
      await car.update({totalPrice:quantity * price + antTotalPrice})
    }
    // res.status(201).send();
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
        },
      ],

    });

    // const productinCars = await ProductinCars.findAll({
    //   where: {
    //     [Op.and]: [{ carId: car.id }, { status: false }],
    //   },
    //   include: [
    //     {
    //       model: Products,
    //       attributes: ['name', 'description', 'productImage'],
    //     },
    //   ],
    // });

    res.json(car);
  } catch (error) {
    next(error);
  }
};

// const findAllCars = async (req, res, next) => {
//   try {
//     const { userId } = req.params;
//     const car = await Cars.findOne({
//       where: { userId },
//     });

//     const productinCars = await ProductinCars.findAll({
//       where: {
//         [Op.and]: [{ carId: car.id }, { status: false }],
//       },
//       include: [
//         {
//           model: Products,
//           attributes: ['name', 'description', 'productImage'],
//         },
//       ],
//     });

//     res.json(productinCars);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  addCar,
  findAllCars,
};
