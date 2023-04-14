const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://kbuiles1:${password}@cluster0.zjm9l8n.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: Number,
    date: Date,
})

const Phonebook = mongoose.model('Phonebook', phoneBookSchema);

if (name && number) {
    const phonebook = new Phonebook({
        name: 'Joaquin Perez',
        number: 3217182371,
        date: new Date(),
    });

    phonebook.save().then(result => {
        console.log('Number saved!')
        mongoose.connection.close()
    });
} else {
    Phonebook.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person);
        });

        mongoose.connection.close();
    });
}


