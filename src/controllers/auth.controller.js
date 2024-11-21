import User from '../models/user.model.js';  
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createAccessToken } from "../libs/jwt.js";
import mConfirmacion from './mConfirmacion.js';
import { mReestablecer } from './mReestablecer.js';
import path from 'path';  // Asegúrate de importar path
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (req, res) => {
    console.log("Registro en curso");

    const { username, email, password, phoneNumber, address } = req.body;

    console.log(username, email, password, phoneNumber, address);

    try {
        // Crear un usuario de prueba si no existe
        const testUser = await User.findOne({ username: 'test' });

        if (!testUser) {
            const testPasswordHash = await bcrypt.hash('123123', 10);  // Contraseña para el usuario test
            const newTestUser = new User({
                username: 'test',
                email: 'test@test.com',
                password: testPasswordHash,
                phoneNumber: '1234567890',
                address: {
                    street: 'Test Street',
                    city: 'Test City',
                    province: 'Test Province',
                    postalCode: '12345'
                }
            });

            // Guardar el usuario de prueba en la base de datos
            await newTestUser.save();
            console.log('Usuario de prueba creado');
        }

        // Crear el usuario normal (el que se recibe en la solicitud)
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            phoneNumber,
            address: {
                street: address.street,
                city: address.city,
                province: address.province,
                postalCode: address.postalCode
            }
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie("token", token);

        await mConfirmacion({ body: { name: username, email } }, res);
        res.redirect("/api/login");

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changePassword = async (req,res) => {
    const {currentPassword,newPassword,confirmPassword} = req.body

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message:"Las contraseñas no coinciden"})
    }
    try {
        const userFound = await User.findById(req.user.id)
        if (!userFound) {
            return res.status(404).json ({message:"Usuario no encontrado"})
        }
        const isMatch = await bcrypt.compare(currentPassword,userFound.password)
        if (!isMatch) {
            return res.status(400).json ({message:"La contraseña actual es incorrecta"})
        }
        const passwordHash = await bcrypt.hash(newPassword, 10);
        userFound.password = passwordHash
        await userFound.save()
        console.log("NuevaContraseña: "+ newPassword);
        res.redirect("/api/confirmChangePass");


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
};
export const resetPassword = async (req, res) => {

    const { email } = req.body; 
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Las contraseñas no coinciden.' });
    }

    try {
        // Buscar al usuario por el email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Hashear la nueva contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;
        await user.save();

        // Enviar el correo de confirmación usando mReestablecer
        await mReestablecer({ body: { name: user.username, email } }, res);

        // Redirigir a la página de confirmación de envío de correo
        console.log("Se envio el mail correctamente");
        
        return res.redirect('/api/confirmSendEmail');

    } catch (error) {
        console.error('Error al restablecer la contraseña: ', error);
        return res.status(500).json({ message: 'Error al restablecer la contraseña.' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(404).json({ message: "Contraseña incorrecta" });

        const token = await createAccessToken({ id: userFound._id });

            req.session.user = {
            id: userFound._id,
            nombre: userFound.nombre,
            email: userFound.email
        };

        res.cookie("token", token);

        res.redirect("/");

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controllers/authController.js
export const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie("token");  
    return res.redirect("/");
}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);
        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        return res.sendFile(path.join(__dirname, '../pages/profile.html'));  

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}
