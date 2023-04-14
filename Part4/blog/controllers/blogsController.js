const blogsRoutes = require("express").Router();
const blogsModel = require("../models/blogs");

blogsRoutes.get('/', (request, response) => {
    blogsModel
        .find({})
        .then((blogs) => {
            response.json(blogs);
        });
});

blogsRoutes.post('/', (request, response) => {
    const blog = new blogsModel(request.body);

    blog
        .save()
        .then((result) => {
            response.status(201).json(result)
        });
});

module.exports = blogsRoutes;