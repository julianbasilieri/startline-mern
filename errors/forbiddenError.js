class ForbiddenError extends Error {
    constructor() {
        super('Accion no permitida')
        this.name = 'ForbiddenError'
        this.status = 403
    }
}

module.exports = ForbiddenError