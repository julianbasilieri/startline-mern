const express = require('express')

const app = express()

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

module.exports = app