const Products = require("../models/products.model");
const Users = require("../models/users.model");
const { Op } = require("sequelize");

const createProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    await Products.create(newProduct);
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};

const updateDescriptionProduct = async (req, res, next) => {
  try {
      const { id } = req.params;    
      const { description } = req.body;
      await Products.update({description},{
          where:{ id }
      });
      res.status(204).send()
  } catch (error) {
    next(error);
  }
};

const updateAvailableQtyProduct = async (req, res, next) => {
  try {
      const { id } = req.params;    
      const { availableQty } = req.body;
      await Products.update({availableQty},{
          where:{ id }
      });
      res.status(204).send()
  } catch (error) {
    next(error);
  }
};

const getProductsZero = async (req, res, next) => {
  try {
    const products = await Products.findAll({
      where:{ availableQty: { [Op.gt]: 0 } },
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'avatar'],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductsOne = async (req, res, next) => {
  try {
    const products = await Products.findAll({
      where:{ availableQty: { [Op.lt]: 1 } },
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'avatar'],
        },
      ],
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateDescriptionProduct,
  updateAvailableQtyProduct,
  getProductsZero,
  getProductsOne,
};
