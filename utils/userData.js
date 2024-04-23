function userData(object) {
    return {
        firstname: object.firstname,
        middlename: object.middlename ? object.middlename : '',
        lastname: object.lastname,
        username: object.username,
        email: object.email,
        password: object.password,
    }
}

module.exports = userData