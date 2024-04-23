const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Loguea el error en la consola para propósitos de debugging
    return res.json({ success: false, message: err.message })
};

module.exports = errorHandler;