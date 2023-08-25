const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');

// описание схемы пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Имя пользователя не может быть короче 2 символов'],
    maxlength: [30, 'Имя пользователя не может быть длиннее 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Имя пользователя не может быть короче 2 символов'],
    maxlength: [30, 'Имя пользователя не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(
        v,
        {
          protocols: ['http', 'https'],
          require_protocol: true,
        },
      ),
      message: () => 'Некоректный URL',
    },
  },
  email: {
    type: String,
    required: [true, 'Заполните поле email'],
    unique: true,
    validate: {
      validator: (v) => (
        validator.isEmail(v)
      ),
      message: 'Введите корректный адрес почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле пароль'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
