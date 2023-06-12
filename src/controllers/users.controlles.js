const Users = require("../models/users.model");
const Cars = require("../models/cars.model");
const Orders = require("../models/orders.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendWelcomeMail } = require("../utils/sendMails");
require("dotenv").config();

const createUser = async (req, res, next) => {
  try {
    // no importa que tan largo sea el nombre de tu funcion o variable
    // siempre y cuando explique lo que hace
    const { firstname, lastname, username, email, password, avatar } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await Users.create({ firstname, lastname, username, email, avatar, password: hashed });
    const user = await Users.findOne({
      where: { email },
    });
    await Cars.create({ userId: user.id });
    await Orders.create({ userId: user.id });
    res.status(201).send();

    // necesitamos mandar un token para identificar esta acción
    const verifyToken = jwt.sign(
      { username, email },
      process.env.JWT_SECRET_EMAIL_VALIDATION,
      {
        algorithm: "HS512",
        expiresIn: "12h",
      }
    );

    sendWelcomeMail(email, { username, verifyToken });
    // sendWelcomeMail(email, { username, email });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return next({
        status: 400,
        name: "Invalid email",
        message: "user not exist",
      });
    }

    if (!user.validUser) {
      return next({
        status: 400,
        name: "email is not verified",
        message: "User needs verified his/her email",
      });
    }

    // comparar las contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next({
        status: 400,
        name: "Invalid password",
        message: "The password does not match with user email",
      });
    }
    const { username } = user;
    
    // no responder la contraseña
    
    // debemos devolver un token para que el usuario loggeado
    // pueda acceder a los recursos del back
    
    // Genera token
    const userData = { username, email};
    const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
      algorithm: "HS512",
      expiresIn: "5m",
    });
    // agregar el token en userData
    userData.token = token;

    res.json(userData);
  } catch (error) {
    next(error);
  }
};

const validateEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VALIDATION, {
      algorithms: "HS512",
    });
   // decoded = {email, username}

    if (!decoded) {
      next({
        status: 400,
        name: "Error de verificación",
        message: "Algo sucedio con la verificació, solicite nuevamente",
      });
    }

    await Users.update(
      { validUser: true },
      {
        where: { email: decoded.email },
      }
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
      const { id } = req.params;    
      const { username, avatar } = req.body;
      await Users.update({username, avatar},{
          where:{ id }
      });
      res.status(204).send()
  } catch (error) {
    next(error);
  }
};

const getUserAll = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ['password'],
      }
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUser,
  createUser,
  login,
  validateEmail,
  getUserAll,
};
