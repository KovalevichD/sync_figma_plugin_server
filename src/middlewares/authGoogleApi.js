const {google} = require('googleapis')
const {EMAIL, API_KEY} = require('../common/config')
// const keys = require('../../keys.json')

const authenticate = async (req, res, next) => {

    const client = new google.auth.JWT(
        EMAIL,
        null,
        API_KEY,
        ['https://www.googleapis.com/auth/spreadsheets']
    )

     await google.sheets({
        version: 'v4',
        auth: client
    });
    next()
}

module.exports = authenticate