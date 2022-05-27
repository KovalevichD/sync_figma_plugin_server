const router = require('express').Router();
const {NOT_FOUND, OK} = require('http-status-codes');
const catchErrors = require('../utils/catch-errors');
const ErrorHandler = require('../utils/error-handler');
const {SECRET_KEY} = require('../common/config');
const axios = require('axios');
const axiosInstance = axios.create({
    baseURL: 'https://api.airtable.com/v0/',
    headers: {
        "X-Airtable-Client-Secret": SECRET_KEY
    }
});
const authHeader = 'Airtable-Figma-Plugin-ApiKey';
// /bases
router.route('/').get(
    catchErrors(async (req, res) => {
        // const apiKey = 'keyhh33Qu8hzqlfhf';
        const apiKey = req.get(authHeader)

        const response = await axiosInstance.get('meta/bases', {headers: {"Authorization": `Bearer ${apiKey}`}});
        const bases = response.data.bases;

        if (!bases.length) {
            throw new ErrorHandler(NOT_FOUND, 'Bases are not found');
        } else {
            res.status(OK).send(bases);
        }
    })
);

// /bases/:baseId
router.route('/:baseId').get(
    catchErrors(async (req, res) => {
        const id = req.params.baseId;
        const apiKey = req.get(authHeader)

        const response = await axiosInstance.get(`meta/bases/${id}/tables`, {headers: {"Authorization": `Bearer ${apiKey}`}});
        const tables = response.data.tables;
//appQeBqBTqUM4PF9G

        if (!tables.length) {
            throw new ErrorHandler(NOT_FOUND, 'Tables are not found');
        } else {
            res.status(OK).send(tables);
        }
    })
);

// /bases/:baseId/:tableId
router.route('/:baseId/:tableId').get(
    catchErrors(async (req, res) => {
        const {baseId, tableId} = req.params;
        const apiKey = req.get(authHeader)

        const response = await axiosInstance.get(`${baseId}/${tableId}`, {headers: {"Authorization": `Bearer ${apiKey}`}});
        const tableData = response.data.records;
//tblXI8OwWFQYNKCYH

        if (!tableData.length) {
            throw new ErrorHandler(NOT_FOUND, 'Records are not found');
        } else {
            res.status(OK).send(tableData);
        }
    })
);

module.exports = router;