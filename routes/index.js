const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { stringValidate } = require('../utils/constants');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: stringValidate(Joi).email(),
    password: stringValidate(Joi),
  }).unknown(true),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: stringValidate(Joi).min(2).max(30),
    email: stringValidate(Joi).email(),
    password: stringValidate(Joi),
  }).unknown(true),
}), createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('token', { sameSite: 'None', secure: true }).send({ message: 'Логаут' });
});

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
