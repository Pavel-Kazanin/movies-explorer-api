const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { editUser, getUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }).unknown(true),
}), editUser);

module.exports = router;
