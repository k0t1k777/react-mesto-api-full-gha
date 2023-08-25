const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const httpValidator = require('../utils/constans');

const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(httpValidator),
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

module.exports = router;
