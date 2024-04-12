require('dotenv').config()

const app = require('./app')

function server() {
    app.listen(app.get('port'))
    console.log('Servidor levantado en el puerto', app.get('port'))
}

server()