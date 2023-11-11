const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => /^(http|https):\/\/(www.)*([a-z0-9-.]+).(ru|com|org|in|dev|net|co)([a-zA-Z0-9\-._/~:?#[\]@!$&'()*+,;=])*/.test(v),
      message: 'Некорректный URL',
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => /^(http|https):\/\/(www.)*([a-z0-9-.]+).(ru|com|org|in|dev|net|co)([a-zA-Z0-9\-._/~:?#[\]@!$&'()*+,;=])*/.test(v),
      message: 'Некорректный URL',
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => /^(http|https):\/\/(www.)*([a-z0-9-.]+).(ru|com|org|in|dev|net|co)([a-zA-Z0-9\-._/~:?#[\]@!$&'()*+,;=])*/.test(v),
      message: 'Некорректный URL',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
