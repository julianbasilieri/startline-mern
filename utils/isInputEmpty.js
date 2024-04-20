function isInputEmpty(object) {
    const data = Object.values(object)
    return data.some((item) => !item.trim().length)
}

module.exports = isInputEmpty
