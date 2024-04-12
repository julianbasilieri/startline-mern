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

module.exports = app