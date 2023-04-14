const config = require('./utils/config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('./utils/logger');
const phonebookRoutes = require('./controllers/phonebook');
const middleware = require('./utils/middleware');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Mongoose conection to MongoDB 
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Morgan token body params definition
morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :response-time ms :body'));
app.use(middleware.requestLogger);
app.use('/api/persons', phonebookRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

module.exports = app;