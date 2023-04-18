const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');

const logger = require('./utils/logger');
const blogsRoutes = require('./controllers/blogsController');
const usersRoutes = require('./controllers/usersController');
const loginRoutes = require('./controllers/loginController');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(express.json());
// Morgan token body params definition
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms :body'));

// Connection to mongodb database
mongoose.connect(config.MONGODB_URI)
    .then(result => logger.info("Connected to mongoDB"))
    .catch(error => logger.error('Error connecting to mongoDB: ', error));


app.use(middleware.requestLogger);

// Setting up the blog controller
app.use('/api/blogs', blogsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/login', loginRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;