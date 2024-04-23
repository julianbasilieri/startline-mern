const errorHandler = (err, req, res, next) => {
    // console.error(err.stack);
    return res.json({ success: false, message: err.message })
};

module.exports = errorHandler;