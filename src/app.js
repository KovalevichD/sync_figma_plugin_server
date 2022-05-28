const express = require('express');
const YAML = require('yamljs');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const requestLog = require('./middlewares/request-log');
const handleError = require('./middlewares/handle-error');
const basesRouter = require('./routes/bases.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(cors());
app.use(requestLog);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Server is running!');

        return;
    }

    next();
});

app.use('/bases', basesRouter);

app.use(handleError);

module.exports = app