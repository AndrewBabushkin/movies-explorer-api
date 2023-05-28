const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');
const config = require('./config');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/ratelimit');
const cors = require('./middlewares/cors');

const app = express();

mongoose.connect(config.connectDb);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);
app.use(router);

app.use(errorLogger);
app.use(helmet());
app.use(errors());
app.use(limiter);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log('Server start - ok');
});
