const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const { createRoles, createAdmin } = require('./utils/initialSetup')
const errorHandler = require('./middlewares/errorHandler')
const notFound = require('./middlewares/notFound')

const app = express()
createRoles()
createAdmin()

// Configuracion
app.set('port', process.env.PORT)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

// Routes
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/users', require('./routes/users.route'))
app.use('/api/subjects', require('./routes/subject.route'))
app.use('/api/posts', require('./routes/post.route'))
app.use('/api/comments', require('./routes/comment.route'))

app.use(errorHandler)
    .use(notFound)

module.exports = app