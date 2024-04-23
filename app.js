const express = require('express')
const cors = requiere('cors')
const helmet = require('helmet');
const morgan = require('morgan')

const createRoles = require('./utils/initialSetup')
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound')


const app = express()
createRoles()

// Configuracion
app.set('port', process.env.PORT)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())


// Routes
app.get('/', (req, res) => {
    res.send('Funcionando')
})

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/users', require('./routes/users.route'))

app.use(errorHandler)
    .use(notFound)

module.exports = app