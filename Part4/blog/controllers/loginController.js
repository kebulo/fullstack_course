const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const userModel = require('../models/users');


loginRouter.post('/', async (request, response) => {
    const params = request.body;
    const user = await userModel.findOne({ username: params.username });

    const passwordCorrect = user === null
        ? false
        : bcrypt.compareSync(params.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: "Invalid username or password"
        });
    }

    const userForToken = {
        username: user.username,
        id: user.id
    };

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        //{ expiresIn: 60*60 }
    );

    response
        .status(200)
        .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;