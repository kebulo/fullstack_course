const config = require('./utils/config')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./utils/logger');
const phonebookRoutes = require('./controllers/phonebook');

const errorHandler = require('./utils/middleware');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Morgan token body definition
morgan.token('body', (req, res) => JSON.stringify(req.body))

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    });

app.use(morgan(':method :url :status :response-time ms :body'));

app.use('/api/persons', phonebookRoutes);
app.use(errorHandler);

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>');
});

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
});