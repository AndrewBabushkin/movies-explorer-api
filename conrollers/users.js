const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const EmailExistsError = require('../errors/EmailExistsError');
const DocumentNotFoundError = require('../errors/DocumentNotFoundError');
const AuthorisationError = require('../errors/AuthorisationError');
const config = require('../config');

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash, name })
      .then((user) => {
        res.status(201).send({
          user: {
            email: user.email,
            name: user.name,
          },
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(
            new EmailExistsError(
              'Пользователь с таким email уже зарегистрирован.',
            ),
          );
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new ValidationError('Переданы некорректные данные.'));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Неправильные почта или пароль.');
      }
      const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new DocumentNotFoundError('Пользователь с таким _id не найден.');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new DocumentNotFoundError('Пользователь с таким _id не найден.');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  login,
  createUser,
  getUser,
  updateUserInfo,
};
