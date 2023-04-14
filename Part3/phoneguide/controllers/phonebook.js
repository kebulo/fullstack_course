const phonebookRoutes = require('express').Router();
const Phonebook = require('../models/phonebook');

const findPersonByID = async (id) => {
    if (id) {
        return await Phonebook.findById(id).then(person => person);
    }

    return "";
};

const getPersonByParams = async (params) => {
    return await Phonebook.findOne({name: params.name}).then(result => result);
}


phonebookRoutes.get('/', (request, response, next) => {
    Phonebook.find({}).then((resp) => {
        response.json(resp);
    }).catch(error => next(error));
});

phonebookRoutes.get('/:id', (request, response, next) => {
    const id = request.params.id;
    const person = findPersonByID(id);

    person.then((resp) => {
        if (resp) {
            response.json(resp);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error));
});

phonebookRoutes.post('/', async (request, response, next) => {
    const params = request.body;

    if (!params.name || !params.number) {
        return response.status(400).json({
            error: 'Content missing'
        });
    }

    const searchPerson = await getPersonByParams(params);

    if (searchPerson) {
        return response.status(400).json({
            error: 'Name must be unique, the name you entered is already register in the Phonebook'
        });
    }

    const phoneNumber = new Phonebook({
        name: params.name,
        number: params.number,
        date: new Date(),
    });

    phoneNumber.save().then((result) => {
        response.json(result);
    }).catch(error => next(error));
});

phonebookRoutes.put('/:id', (request, response, next) => {
    const params = request.body;

    const phoneNumber = {
        "name": params.name,
        "number": params.number
    }

    Phonebook.findByIdAndUpdate(request.params.id, phoneNumber, {new: true})
        .then(result => response.json(result))
        .catch(error => next(error));
})

phonebookRoutes.delete('/:id', (request, response, next) => {
    const id = request.params.id;

    Phonebook.findByIdAndRemove(id).then((result) => {
        response.status(204).end();
    }).catch(error => next(error));
});

module.exports = phonebookRoutes;