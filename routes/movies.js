const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlRegex, idValidate } = require('../utils/constants');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    owner: idValidate(Joi),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }).unknown(true),
}), createMovie);
router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: idValidate(Joi),
  }).unknown(true),
}), deleteMovie);

module.exports = router;
