const router = require('express').Router();
const {NOT_FOUND, BAD_REQUEST, OK, getStatusText} = require('http-status-codes');
const sheetsApi = require('../../middlewares/authGoogleApi')
const catchErrors = require('../../utils/catch-errors');
const ErrorHandler = require('../../utils/error-handler');
const {google} = require('googleapis')


router.route('/').get(
    catchErrors(async (req, res) => {

        const opt = {
            spreadsheetId: '15wMvgkz_v_YkNQzMCuIP0fPJgv1-iQlT0qO0klf35D8',
            range: 'Generic'
        }

        const data = await sheetsApi.spreadsheets.values.get(opt)

        console.log(data)
        if (!data) {
            throw new ErrorHandler(NOT_FOUND, 'Spreadsheet not found');
        } else {
            res.status(OK).json(data.data.values);
        }
    })
);
//
// router.route('/:id').get(
//     catchErrors(async (req, res) => {
//         const id = req.params.id;
//         const board = await boardsService.getById(id);
//         if (!board) {
//             throw new ErrorHandler(NOT_FOUND, 'Board is not found');
//         } else {
//             res.status(OK).json(Board.toResponse(board));
//         }
//     })
// );
//
// router.route('/').post(
//     catchErrors(async (req, res) => {
//         const board = req.body;
//         const newBoard = await boardsService.createBoard(board);
//         if (!newBoard) {
//             throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
//         } else {
//             res.status(OK).json(Board.toResponse(newBoard));
//         }
//     })
// );
//
// router.route('/:id').put(
//     catchErrors(async (req, res) => {
//         const id = req.params.id;
//         const update = req.body;
//         update.id = id;
//         const updatedBoard = await boardsService.updateBoard(update);
//         if (!updatedBoard) {
//             throw new ErrorHandler(NOT_FOUND, 'Board is not found');
//         } else {
//             res.status(OK).json(Board.toResponse(update));
//         }
//     })
// );
//
// router.route('/:id').delete(
//     catchErrors(async (req, res) => {
//         const id = req.params.id;
//         const deletedBoard = await boardsService.deleteBoard(id);
//         if (!deletedBoard) {
//             throw new ErrorHandler(NOT_FOUND, 'Board is not found');
//         } else {
//             res.status(OK).send('Board is deleted');
//         }
//     })
// );

module.exports = router;