function hasNoData(object) {
    const array = Object.values(object);

    return array.some((item) => !item.trim())
}

module.exports = hasNoData