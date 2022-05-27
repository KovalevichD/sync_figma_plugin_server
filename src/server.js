const {PORT} = require('./common/config');
const app = require('./app');
const {exit} = process;

process
    .on('uncaughtException', (err, origin) => {
        console.error(
            'error',
            `Caught exception: ${err}. Exception origin: ${origin}`
        );
        exit(1);
    })
    .on('unhandledRejection', (reason, promise) => {
        console.error(
            'error',
            `Unhandled Rejection at: ${promise}. Reason: ${reason}`
        );
        exit(1);
    });

app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT || 80}`)
);
