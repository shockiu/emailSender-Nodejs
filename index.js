require('dotenv').config();
var express = require('express');
var nodemailer = require('nodemailer');
var app = express();
var port = (process.env.PORT || 3000);
app.listen(port, function () {
    console.log("Servidor corriendo en puierto " + port);
});
app.get('/', function (req, res) {
    res.status(200).send({
        text: 'todo bien'
    });
});
app.post('/mail', function (req, res) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'email desde donde se va enviar la info',
            pass: 'clave del email'
        }
    });
    var message = {
        from: "sender@server.com",
        to: "Email@email.com",
        subject: "Titulo del mensaje",
        html: "<p>La version HTML del mensaje</p>" // Cuerpo del mensaje
    };
    transporter.sendMail(message, function (error, info) {
        if (error) {
            console.log('Ocurrio un error');
            console.log(error.message);
            // return process.exit(1);
        }
        else {
            console.log(info);
            console.log('Mensaje enviado !!!');
            res.status(200).send({
                message: 'todo cool'
            });
        }
    });
});
