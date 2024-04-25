const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "basilierijulian@gmail.com",
        pass: "bvhb lges aosu rddi"
    }
});

const sendMail = async (usuario, token) => {
    try {
        const options = {
            from: {
                name: "ScienceNet",
                address: "basilierijulian@gmail.com"
            },
            // to: usuario.email, // Personalizar el correo con el email del usuario
            to: "julian_basilieri@hotmail.com",
            subject: "¡Bienvenido a nuestra plataforma!",
            html: `
                <p>Hola ${usuario.firstname} ${usuario.lastname},</p>
                <p>¡Bienvenido a nuestra plataforma!</p>
                <p>Para activar tu cuenta, por favor haz clic en el siguiente botón:</p>
                <a href="http://localhost:4000/api/users/activate/${token}" target="_blank" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Activar cuenta</a>
            `
        };
        await transporter.sendMail(options);
        console.log('Mail enviado');
    } catch (error) {
        console.log(error);
    }
};

module.exports = sendMail;
