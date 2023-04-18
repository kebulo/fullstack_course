const blogsRoutes = require("express").Router();
const jwt = require('jsonwebtoken');
const blogsModel = require("../models/blogs");
const userModel = require("../models/users");

const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLoweCase().startWith('bearer ')) {
        return authorization.substring(7);
    }

    return null;
}

blogsRoutes.get('/', (request, response) => {
    blogsModel
        .find({})
        .then((blogs) => {
            response.json(blogs);
        });
});

blogsRoutes.post('/', async (request, response) => {
    const params = request.body;
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token is missing or invalid' });
    }

    const user = await userModel.findById(params.userId);
    
    const blog = new blogsModel({
        title: params.title,
        author: params.author,
        url: params.url,
        likes: params.likes,
        user_id: user.id
    });

    blog
        .save()
        .then((result) => {
            response.status(201).json(result);
        }).catch((error) => {
            response.status(400).json(error)
        });
});

module.exports = blogsRoutes;