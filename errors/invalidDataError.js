class InvalidDataError extends Error {
    constructor() {
        super('datos invalidos')
        this.name = 'InvalidData'
        this.status = 422
    }
}

module.exports = InvalidDataError
