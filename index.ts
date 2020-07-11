require('dotenv').config();
var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

const port = (process.env.PORT || 3000);

app.listen(port, () => {
    console.log(`Servidor corriendo en puierto ${port}`)
});

app.get('/', (req: any, res: any) => {
    res.status(200).send({
        text: 'todo bien'
    })
})

app.post('/mail', (req: any, res: any) => {


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'email desde donde se va enviar la info',
            pass: 'clave del email'
        }
    });

    var message = {
        from: "sender@server.com", //  Quien se lo envia
        to: "Email@email.com", // A la persona que se le desea enviar el correo
        subject: "Titulo del mensaje", // Asunto del mensaje
        html: "<p>La version HTML del mensaje</p>" // Cuerpo del mensaje
      };

    transporter.sendMail(message, (error: any, info: any) =>{
        if (error) {
            console.log('Ocurrio un error');
            console.log(error.message);
            // return process.exit(1);
        } else {
            console.log(info);
            console.log('Mensaje enviado !!!');
            res.status(200).send({
                message: 'todo cool'
            })
        }

        
    })
})