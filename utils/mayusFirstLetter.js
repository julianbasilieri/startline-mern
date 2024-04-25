function mayusFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

module.exports = mayusFirstLetter