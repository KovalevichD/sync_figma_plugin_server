const express = require('express');
const requestLog = require('./middlewares/request-log');
const handleError = require('./middlewares/handle-error');
const authGoogleApi = require('./middlewares/authGoogleApi');
const uploadFilesRouter = require('./resources/uploadFiles/uploadFiles.router')
const app = express();

app.use(express.json());
app.use(requestLog);
app.use(authGoogleApi);

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

app.use('/uploadFiles', uploadFilesRouter);

app.use(handleError);

module.exports = app