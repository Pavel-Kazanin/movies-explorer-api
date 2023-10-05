const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  urlValidate,
  idValidate,
  stringValidate,
  numberValidate,
} = require('../utils/constants');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: stringValidate(Joi),
    director: stringValidate(Joi),
    duration: numberValidate(Joi),
    year: stringValidate(Joi),
    description: stringValidate(Joi),
    image: urlValidate(Joi),
    trailerLink: urlValidate(Joi),
    thumbnail: urlValidate(Joi),
    movieId: numberValidate(Joi),
    nameRU: stringValidate(Joi),
    nameEN: stringValidate(Joi),
  }).unknown(true),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: idValidate(Joi).required(),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
