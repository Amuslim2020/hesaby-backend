const UserModel = require("../models/user-model");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res, next) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details[0].message);
  }
  const user = await UserModel.getUserByEmail(req.body.email);
  if (user) return res.send("User already exists!");
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const result = await UserModel.createUser(
    req.body.name,
    req.body.email,
    hashedPassword
  );

  const newUser = await UserModel.getUserByEmail(req.body.email);
  const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
  res
    .header("Authorization", token)
    .send(_.pick(newUser, ["id", "name", "email"]));
};

const login = async (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
  };
  const validateResult = Joi.object(schema).validate(req.body);
  if (validateResult.error) {
    return res.status(400).send(validateResult.error.details[0].message);
  }

  const user = await UserModel.getUserByEmail(req.body.email);
  if (!user) return res.status(400).send("Email or Password is incorrect!");

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch)
    return res.status(400).send("Email or Password is incorrect!");
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  res.send(`token: ${token}`);
};

module.exports = {
  register,
  login,
};
