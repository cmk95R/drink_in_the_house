//const { Router, text } = require('express');//importa express y si metodo "Router"
//const nodemailer = require ('nodemailer');
import { Router } from "express";
import nodemailer from "nodemailer";
const router = Router();//enrutador

export const mConfirmacion = router.post('/send-email', async (req, res) =>{//recibir los datos
    const { name, email, message } = req.body;//Si se borra los 3 inputs mencionados en ./routes/index.html, se podría borrar esto tambien
//Recibiendo los datos enviados del formulario

    //Contenido a enviar del mail
    contentHTMl = `
    <head>
        <style>
        h1{font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;}
        p{font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:rgb(202, 111, 30); font-weight: 500;}
        div{background-color: aliceblue; margin: 20px; padding: 5px;}
        button{background-color: rgb(93, 173, 226); border-radius: .1rem; padding: .5rem; border: 1px black solid;}
        </style>
    </head>
        <body>
            <div>
                <h1>Verificación de correo electrónico</h1>
                <p>Se ha creado una cuenta en Drink In The House con el siguiente correo electrónico: ${email}</p>
                <p>Para activar la cuenta, por favor clicke el botón "Confirmar Mail".</p>
                <p>Si esta cuenta no fue creada por usted, ignore el mail.</p>
                <button>Activar cuenta</button>
                <p><strong>Drunk in the house</strong></p>
            </div>
        </body>
    `//Si no se borró los inputs del html, se puede usar dentro de la estructura html (para infor adicional o no c) ${name}, ${email}, ${message}

//transporter para enviar mail
    const transporter = nodemailer.createTransport({//objeto de configuración que pide los valores
        host: "smtp.gmail.com",//mail predeterminado para gmail
        port: 465,//puerto predeterminado de gmail
        secure: true,//SSL
        auth: {
            user: 'drinksinthehouse57@gmail.com',//direccion gmail a usar
            pass: 'bnkp luas bqwx ifra'//contraseña de gmail. Tiene que ser de aplicación (SMTP)
        }
    });//IMPORTANTE!!!!!!!!!!!!! asignar user y pass para poder enviar el mail, el pass consta de 16 caracteres y se puede sacar en Gmail > Contraseñas de aplicación

    const info = await transporter.sendMail({//Método para enviar Mail
        from: "'Drinks in the house' <drinksinthehouse57@gmail.com>",//Asunto y dirección de mail ${user}
        to: email,//destinatario
        subject: 'Verificación de Cuenta - ',//Asunto
        html: contentHTMl//Contenido a enviar previamente declarado
    });//IMPORANTE!!!!!!!!!!!!!!! poner un mail destinatario

    console.log('Message sent', info.messageId);//verificación de envío por consola (se puede quitar)

    res.redirect('/success.html');//redirección de pestaña
});

//module.exports = router;