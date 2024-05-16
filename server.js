require('dotenv').config()

const app = require('./app')
require('./database')

function server() {
    app.listen(app.get('port'))
    console.log('Servidor levantado')
}

server()