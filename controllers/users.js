const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const MongoServerError = require('../errors/mongo-server-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => {
      res.status(201).send({
        data: {
          name,
          email,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные.'));
      } else if (err.name === 'ValidationError') {
        next(new CastError(err.message));
      } else if (err.name === 'MongoServerError') {
        next(new MongoServerError(`Пользователь с email: ${email} уже существует`));
      } else {
        next(err);
      }
    });
};

const editUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { runValidators: true, returnDocument: 'after' })
    .orFail()
    .then(() => res.status(200).send({ email, name }))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new CastError('Переданы некорректные данные.'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Пользователь с id: ${req.params._id} не найден`));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true });
      const {
        _id,
        name,
      } = user;
      res.send({
        data: {
          _id,
          name,
          email,
        },
      });
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then(({ name, email }) => res.status(200).send({ email, name }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданы некорректные данные.'));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(`Пользователь с id: ${req.params._id} не найден`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser, editUser, login, getUserInfo,
};
