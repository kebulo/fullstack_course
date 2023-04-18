const bcrypt = require('bcryptjs');
const userRouter = require("express").Router();
const userModel = require('../models/users');

userRouter.get('/', async (request, response) => {
    const users = await userModel.find({});
    response.json(users);
})

userRouter.post('/', async (request, response) => {
    const body = request.body;

    const saltRound = 10;
    const passwordHash = bcrypt.hashSync(body.password, saltRound);

    const user = new userModel({
        username: body.username,
        name: body.name,
        passwordHash
    });

    const savedUser = await user.save();

    response.json(savedUser);
});

module.exports = userRouter;