function hasSomeParam(object) {
    return Object.values(object).some(value => value !== undefined)
}

module.exports = hasSomeParam