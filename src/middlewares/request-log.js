const requestLog = (req, res, next) => {
    const {method, url, params, body} = req;

    console.log(
        'info',
        `${method} ${url} ${JSON.stringify(params)} ${JSON.stringify(body)}`
    );

    next();
};

module.exports = requestLog;