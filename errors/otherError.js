class OtherError extends Error {
    constructor(message) {
        super(message)
        this.name = 'OtherError'
        this.status = 400
    }
}

module.exports = OtherError