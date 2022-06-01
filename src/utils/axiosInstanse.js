const axios = require('axios');
const {SECRET_KEY} = require('../common/config');

const axiosInstance = axios.create({
    baseURL: 'https://api.airtable.com/v0/',
    headers: {
        "X-Airtable-Client-Secret": SECRET_KEY
    }
});

module.exports = axiosInstance;