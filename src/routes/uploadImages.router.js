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
        const apiKey = req.get(AUTH_HEADER)
        const response = await axiosInstance.patch(`${baseId}/${tableId}`, payload, {headers: {"Authorization": `Bearer ${apiKey}`}});
        const uploadResult = response.data.records;

        if (!uploadResult.length) {
            throw new ErrorHandler(NOT_FOUND, 'Images were not loaded');
        } else {
            res.status(OK).send(uploadResult);
        }

    })
);

module.exports = router;