require('dotenv').config();

const PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_EVENT === "test") {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
    PORT, MONGODB_URI
}
