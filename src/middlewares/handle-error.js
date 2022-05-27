const handleError = (err, req, res, next) => {
    let {code, message} = err;

    if (err.name === 'AxiosError') code = err.response.status

    console.error('error', `${code} ${message}`);

    res.status(code).json({
        status: 'error',
        code,
        message
    });

    next();
};

module.exports = handleError;