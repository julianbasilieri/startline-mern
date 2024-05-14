const nodemailer = require('nodemailer')

const sendMail = {}

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

sendMail.sendMailVerify = async (usuario, token) => {
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

sendMail.sendMailPassword = async (usuario, token, contrasena) => {
    try {
        const options = {
            ...headerMail,
            subject: "Recuperacion de contraseña",
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <div style="background-color: #FF6347; color: #fff; padding: 20px;">
                            <h1 style="margin: 0;">Recuperación de contraseña</h1>
                        </div>
                        <div style="padding: 20px;">
                            <p style="font-size: 16px;">Hola ${usuario.firstname} ${usuario.lastname},</p>
                            <p style="font-size: 16px;">Has solicitado una recuperación de contraseña. Tu nueva contraseña es:</p>
                            <p style="font-size: 16px;">${contrasena}</p>
                            <div style="text-align: center;">
                                <a href="http://localhost:4000/api/auth/change-password/${token}/${contrasena}" target="_blank" style="display: inline-block; padding: 15px 30px; background-color: #FF6347; color: #fff; text-decoration: none; border-radius: 5px; font-size: 18px;">Recuperar cuenta</a>
                            </div>                            
                            <p style="font-size: 16px; color: #888;">Si no has solicitado esta recuperación, por favor ignora este mensaje.</p>
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

module.exports = sendMail