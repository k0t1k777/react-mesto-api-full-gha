const router = require('express').Router();
const express = require('express');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const app = express();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Пользователь с таким id не найден'));
});

module.exports = router;
