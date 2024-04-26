function userData(object) {
    return {
        firstname: object.firstname,
        middlename: object.middlename,
        lastname: object.lastname,
        birthdate: object.birthdate,
        photo: object.photo,
        university: object.university,
        extra_info: object.extra_info,
    }
}

module.exports = userData