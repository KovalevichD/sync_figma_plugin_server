const router = require('express').Router();
const {NOT_FOUND, OK} = require('http-status-codes');
const catchErrors = require('../utils/catch-errors');
const ErrorHandler = require('../utils/error-handler');
const {AUTH_HEADER} = require('../common/config');
const axiosInstance = require('../utils/axiosInstanse');

// /uploadImages
router.route('/:baseId/:tableId').post(
    catchErrors(async (req, res) => {
        const payload = req.body;
        const {baseId, tableId} = req.params;
        const apiKey = req.get(AUTH_HEADER);
        const result = [];
        let receivedRecords = 0;
        let updatedRecords = 0;

        payload.forEach(el => receivedRecords += el.records.length);

        for (let i = 0; i < payload.length; i++) {// todo make 5 req/sec
            const response = await axiosInstance.patch(`${baseId}/${tableId}`, payload[i], {headers: {"Authorization": `Bearer ${apiKey}`}});
            const updatedRecordsResult = response.data.records;

            result.push(updatedRecordsResult);
            updatedRecords += updatedRecordsResult.length
        }

        if (!result.length) {
            throw new ErrorHandler(NOT_FOUND, 'Images were not loaded');
        } else {
            res.status(OK).send(`${updatedRecords}/${receivedRecords} records updated`);
        }

    })
);

module.exports = router;