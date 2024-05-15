const InvalidDataError = require('../errors/invalidDataError')
const NotFoundError = require('../errors/notFoundError')
const Subject = require('../models/subject')
const hasSomeParam = require('../utils/hasSomeparam')

const SubjectController = {}

SubjectController.getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find().populate('posts')

        return res.json({ success: true, subjects })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

SubjectController.postSubject = async (req, res, next) => {
    try {
        const subject = {
            name: req.body.name,
            info: req.body.info,
            color: req.body.color || '#' + Math.floor(Math.random() * 16777215).toString(16)
        }

        const nuevoSubject = new Subject(subject)

        const subjectGuardado = await nuevoSubject.save()
        return res.json({ success: true, subjectGuardado, message: 'Subject creada correctamente' })
    } catch (error) {
        return res.json({ success: false, message: error.stack })
    }
}

SubjectController.deleteById = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id)

        if (!subject) throw new NotFoundError('Subject')

        return res.json({ success: true, message: 'Subject eliminada correctamente', subject })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

SubjectController.updateById = async (req, res, next) => {
    try {
        const subject = {
            name: req.body.name,
            info: req.body.info,
            color: req.body.color
        }

        if (!hasSomeParam(subject)) throw new InvalidDataError()

        const subjectActualizada = await Subject.findByIdAndUpdate(req.params.id, subject, { new: true })

        if (!subjectActualizada) throw new NotFoundError('Subject')

        return res.json({ success: true, message: 'Subject actualizada correctamente', subjectActualizada })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = SubjectController