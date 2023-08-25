const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const httpValidator = require('../utils/constans');

const {
  getInfoMe,
  getAllUsers,
  getUserId,
  updateProfile,
  updateAvatar,

} = require('../controllers/users');

// возвращает информацию о текущем пользователе
router.get('/me', getInfoMe);

// возвращает всех пользователей
router.get('/', getAllUsers);

// возвращает пользователя по _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserId);

// обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// обновляет аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(httpValidator),
  }),
}), updateAvatar);

module.exports = router;
