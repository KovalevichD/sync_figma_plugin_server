const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.join(__dirname, '../../.env')
})

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    AUTH_HEADER: 'Airtable-Figma-Plugin-ApiKey'
}