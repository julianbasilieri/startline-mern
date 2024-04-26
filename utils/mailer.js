const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "basilierijulian@gmail.com",
        pass: "bvhb lges aosu rddi"
    }
})

const headerMail = {
    from: {
        name: "Science4Everybody",
        address: "basilierijulian@gmail.com"
    },
    // to: usuario.email
    to: "julian_basilieri@hotmail.com"
}

// Coregir el href para poner la conexion en las variables de entorno
const sendMailVerify = async (usuario, token) => {
    try {
        const options = {
            ...headerMail,
            subject: "¡Bienvenido a nuestra plataforma!",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <div style="background-color: #118DF0; color: #fff; padding: 20px;">
                            <h1 style="margin: 0;">¡Bienvenido a Science4Everybody!</h1>
                        </div>
                        <div style="padding: 20px;">
                            <p style="font-size: 16px;">Hola ${usuario.firstname} ${usuario.lastname},</p>
                            <p style="font-size: 16px;">¡Bienvenido a nuestra plataforma!</p>
                            <p style="font-size: 16px;">Para activar tu cuenta, por favor haz clic en el siguiente botón:</p>
                            <div style="text-align: center;">
                                <a href="http://localhost:4000/api/users/activate/${token}" target="_blank" style="display: inline-block; padding: 15px 30px; background-color: #118DF0; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Activar cuenta</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        await transporter.sendMail(options)
        console.log('Mail enviado')
    } catch (error) {
        console.log(error)
    }
}

const sendMailPassword = async(usuario, token) => {
    
}

module.exports = sendMailVerify
