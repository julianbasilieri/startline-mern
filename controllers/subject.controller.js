const Subject = require('../models/subject')
const hasSomeParam = require('../utils/hasSomeparam')

const SubjectController = {}

SubjectController.getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find()

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
            color: req.body.color ? req.body.color : '#' + Math.floor(Math.random() * 16777215).toString(16)
        }

        const nuevoSubject = new Subject(subject)

        const subjectGuardado = await nuevoSubject.save()

        return res.json({ success: true, subjectGuardado })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

SubjectController.deleteById = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id)

        if (!subject) throw new Error('Subject no encontrada')

        return res.json({ success: true, message: 'Subject eliminado correctamente' })
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

        hasSomeParam(subject)

        const subjectActualizada = await Subject.findByIdAndUpdate(req.params.id, subject, { new: true })

        if (!subjectActualizada) throw new Error('Subject no encontrada')

        return res.json({ success: true, message: 'Subject actualizada correctamente', subjectActualizada })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

module.exports = SubjectController