require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors, celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { stringValidate } = require('./utils/constants');

const { PORT = 3000, NODE_ENV, DB_URL } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  autoIndex: true,
}).then(() => console.log('connection success'));

app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: stringValidate(Joi).email(),
    password: stringValidate(Joi),
  }).unknown(true),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: stringValidate(Joi).min(2).max(30),
    email: stringValidate(Joi).email(),
    password: stringValidate(Joi),
  }).unknown(true),
}), createUser);
app.get('/signout', (req, res) => {
  res.clearCookie('token').send({ message: 'Логаут' });
});

app.use(require('./routes/index'));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
