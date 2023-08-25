const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getCard = (req, res, next) => {
  Card.find({})
    // .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(new NotFoundError('Пользователь с таким id не найден'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError('Нельзя удалять чужие карточки'));
      }
      return Card.deleteOne(card)
        .then(() => res.send({ data: 'Удаление прошло успешно' }));
    })
    .catch(next);
};

module.exports.makeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: 'true' },
  )
    .orFail()
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный  id'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка с таким id не найдена'));
      } else {
        next(error);
      }
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: 'true' },
  )
    .orFail(new NotFoundError('Пользователь с таким id не найден'))
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный  id'));
      } else {
        next(error);
      }
    });
};
