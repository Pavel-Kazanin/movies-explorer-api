const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { editUser, getUserInfo } = require('../controllers/users');
const { stringValidate } = require('../utils/constants');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: stringValidate(Joi).min(2).max(30),
    email: stringValidate(Joi).email(),
  }).unknown(true),
}), editUser);

module.exports = router;
