class UniqueError extends Error {
    constructor(message) {
        super(message + ' already in use')
        this.name = 'UniqueError'
        this.status = 422
    }
}

module.exports = UniqueError