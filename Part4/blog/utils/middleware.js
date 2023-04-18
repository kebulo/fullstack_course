const User = require('../models/users');
const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (request, response, next) => {
    logger.info('Method: ', request.method);
    logger.info('Path: ', request.path);
    logger.info('Body: ', request.body);
    logger.info('-----------');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' });
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).json({ error: 'Malformatted ID' });
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: error.message });
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: error.message });
    }

    next(error);
}

const tokenExtractor = (request, response, next) => {
    request.token = null;
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }

    next();
}

const userExtractor = async (request, response, next) => {
    request.user = null;

    let decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (decodedToken) {
        let user = await User.findById(decodedToken.id);

        if (user) {
            request.user = user;
        } else {
            return response.status(404).json({ error: "User was not found" });
        }
    }

    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}