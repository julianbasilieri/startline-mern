const express = require('express')

const app = express()

// Configuracion
app.set('port', process.env.PORT || 4001)

// Middlewares
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('Funcionando')
})

app.use('/api/auth/new-user', require('./routes/newUser'))
app.use('/api/users', require('./routes/users'))

module.exports = app