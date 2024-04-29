class NotFoundError extends Error {
    constructor(message) {
        super(message + ' no encontrado')
        this.name = 'NotFoundError'
        this.status = 404
    }
}

module.exports = NotFoundError
