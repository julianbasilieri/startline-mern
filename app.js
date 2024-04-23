const express = require('express')
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound')
const createRoles = require('./utils/initialSetup')

const app = express()
createRoles()

// Configuracion
app.set('port', process.env.PORT)

// Middlewares
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Funcionando')
})

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/users', require('./routes/users.route'))

app.use(errorHandler)
    .use(notFound)

module.exports = app