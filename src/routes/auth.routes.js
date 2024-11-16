import { Router } from "express";
import {login ,register,logout,profile, changePassword } from "../controllers/auth.controller.js"
import path from 'path';
import { fileURLToPath } from 'url';
import {authRequired}  from "../middlewares/validateToken.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

//Ruta para mostrar la pagina de carrito
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/profile.html'));
});

//Ruta para mostrar la pagina de carrito
router.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/carrito.html'));
});


router.get('/medios-pago', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/medios-pago.html'));
});
// Ruta para mostrar la pagina de registro 
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/register.html'));
});

// Ruta para mostrar la pagina de confirmacion de Registro
router.get('/confirm', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/confirm.html'));
});

// Ruta para mostrar la pagina de Cambio de Contraseña
router.get('/change-password', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/recup_contra.html'));
});

// Ruta para mostrar la confirmacion de Cambio de Contraseña 
router.get('/confirmChangePass', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/confirmNewPass.html'));
});

router.get('/sistema-notificaciones', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/sistema-notificaciones.html'));
});


router.get('/perfilUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/perfilusuario.html'));
});
//Ruta para procesar el registro 
router.post('/register', register);

//Ruta para cambiar la pass del usuario 
router.post('/change-password', authRequired, changePassword)

// Ruta para mostrar la pagin de login 
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/login.html'));
});
router.post('/login', login);

// Otras rutas 



router.post("/logout", logout)

router.get('/profile', authRequired , profile)


export default router