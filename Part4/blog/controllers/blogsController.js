const blogsRoutes = require("express").Router();
const jwt = require('jsonwebtoken');
const middleware = require('../utils/middleware');
const blogsModel = require("../models/blogs");
const userModel = require("../models/users");
const { response } = require("../app");

blogsRoutes.get('/', async (request, response) => {
    let blogs = await blogsModel.find({});

    response.json(blogs);
});

blogsRoutes.get('/:id', async (request, response) => {
    let blog = await blogsModel.findById(request.params.id);

    response.json(blog);
});

blogsRoutes.post('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
    const params = request.body;
    const token = request.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token is missing or invalid' });
    }

    const user = await userModel.findById(params.user_id);

    const blog = new blogsModel({
        title: params.title,
        author: params.author,
        url: params.url,
        likes: params.likes,
        user: {
            id: user._id,
            name: user.name,
            username: user.username
        }
    });

    let result = await blog.save();

    response.status(201).json(result);
});

blogsRoutes.patch('/', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
    const params = request.body;
    const token = request.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token is missing or invalid' });
    }

    const user = await userModel.findById(params.user_id);
    const result = await blogsModel.findOneAndUpdate();
    console.log(result);
    response.status(202).json(result);
});

blogsRoutes.put('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
    const params = request.body;
    const token = request.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token is missing or invalid' });
    }

    const user = await userModel.findById(params.user_id);

    let blogData = {
        title: params.title,
        author: params.author,
        url: params.url,
        likes: params.likes,
        user: {
            id: user._id,
            name: user.name,
            username: user.username
        }
    };

    const result = await blogsModel.findByIdAndUpdate(request.params.id, blogData, { new: true });

    response.status(202).json(result);
});

blogsRoutes.delete('/:id', [middleware.tokenExtractor, middleware.userExtractor], async (request, response) => {
    let id = request.params.id;
    let error = { message: "Blog not found", statusCode: 404 };

    let blog = await blogsModel.findById(id);

    if (blog) {
        if (blog.user.__id === request.user.__id) {
            await blogsModel.findByIdAndDelete(id);
            return response.status(204).end();
        }

        error = {
            statusCode: 401,
            message: "Unauthorized request"
        }
    }

    return response.status(error.statusCode).json({ error: error.message });
});

module.exports = blogsRoutes;