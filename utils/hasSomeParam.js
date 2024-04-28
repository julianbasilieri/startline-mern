function hasSomeParam(object) {
    const parametersProvided = Object.values(object).some(value => value !== undefined);

    if (!parametersProvided) throw new Error('Los datos no son validos')
}

module.exports = hasSomeParam