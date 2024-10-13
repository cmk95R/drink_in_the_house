import { Router } from "express";
import nodemailer from "nodemailer";
const router = Router();//enrutador

export const mReestablecer = router.post('/send-pass', async (req, res) =>{//recibir los datos
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
                <h1>Reestablecer contraseña</h1>
                <p>Se ha enviado una petición para reestablecer la contraseña en esta dirección de gmail.</p>
                <p>Para validar el reestablecimiento de contraseña, por favor clicke el botón "Reestablecer Contraseña".</p>
                <p>Si esta petición no fue enviada por usted, contacte con el soporte.</p>
                <button>Reestablecer Contraseña</button>
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
        subject: 'Reestablecer Contraseña - ',//Asunto
        html: contentHTMl//Contenido a enviar previamente declarado
    });//IMPORANTE!!!!!!!!!!!!!!! poner un mail destinatario

    console.log('Message sent', info.messageId);//verificación de envío por consola (se puede quitar)

    res.redirect('/success.html');//redirección de pestaña
});

//module.exports = router;