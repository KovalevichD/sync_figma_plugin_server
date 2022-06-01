const router = require('express').Router();
const {NOT_FOUND, OK} = require('http-status-codes');
const catchErrors = require('../utils/catch-errors');
const ErrorHandler = require('../utils/error-handler');
const {AUTH_HEADER} = require('../common/config');
const axiosInstance = require('../utils/axiosInstanse');

// /bases
router.route('/').get(
    catchErrors(async (req, res) => {
        const apiKey = req.get(AUTH_HEADER)
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
        const apiKey = req.get(AUTH_HEADER)
        const response = await axiosInstance.get(`meta/bases/${id}/tables`, {headers: {"Authorization": `Bearer ${apiKey}`}});
        const tables = response.data.tables;

        if (!tables.length) {
            throw new ErrorHandler(NOT_FOUND, 'Tables are not found');
        } else {
            res.status(OK).send(tables);
        }
    })
);

// /bases/:baseId/:tableId/view/:viewId
router.route('/:baseId/:tableId/view/:viewId').get(
    catchErrors(async (req, res) => {
        const {baseId, tableId, viewId} = req.params;
        const apiKey = req.get(AUTH_HEADER)
        const response = await axiosInstance.get(`${baseId}/${tableId}?view=${viewId}`, {headers: {"Authorization": `Bearer ${apiKey}`}});
        const tableData = response.data.records;

        if (!tableData.length) {
            throw new ErrorHandler(NOT_FOUND, 'View is not found');
        } else {
            res.status(OK).send(tableData);
        }
    })
);
// /bases/:baseId/:tableId/record/:recordId
router.route('/:baseId/:tableId/record/:recordId').get(
    catchErrors(async (req, res) => {
        const {baseId, tableId, recordId} = req.params;
        const apiKey = req.get(AUTH_HEADER)
        const response = await axiosInstance.get(`${baseId}/${tableId}/${recordId}`, {headers: {"Authorization": `Bearer ${apiKey}`}});
        const recordFields = response.data.fields;

        if (Object.keys(recordFields).length === 0) {
            throw new ErrorHandler(NOT_FOUND, 'Record is not found');
        } else {
            res.status(OK).send(recordFields);
        }
    })
);

module.exports = router;