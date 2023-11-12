require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const handleRouter = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const { apiLimiter } = require('./utils/rateLimiter');

const {
  PORT = 3000,
  NODE_ENV,
  DB_URL,
  DB_URL_DEV,
} = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : DB_URL_DEV, {
  useNewUrlParser: true,
  autoIndex: true,
}).then(() => console.log('connection success'));

app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter);

const corsOptions = {
  origin: ['http://pavelkazaninmovies.nomoredomainsmonster.ru', 'https://pavelkazaninmovies.nomoredomainsmonster.ru', 'http://localhost:3000'],
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

app.use(requestLogger);

app.use(handleRouter);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
