function trimObject(object) {
    const trimmedObject = {};
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            trimmedObject[key] = object[key].trim();
        }
    }
    return trimmedObject;
}

module.exports = trimObject;
