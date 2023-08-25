const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const httpValidator = require('../utils/constans');

const {
  createCard,
  getCard,
  deleteCard,
  makeLike,
  removeLike,
} = require('../controllers/cards');

// создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().pattern(httpValidator),
  }),
}), createCard);

// возвращает все карточку
router.get('/', getCard);

// удаляет карточку по идентификатору
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

// поставить лайк карточке
router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), makeLike);

// убрать лайк с карточки
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), removeLike);

module.exports = router;
