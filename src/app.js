import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.routes.js';
import authRoutes from "./routes/auth.routes.js";
// Configuración para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear instancia de la aplicación Express
const app = express();

app.use('/resources/js', express.static(path.join(__dirname, 'resources/js')));


// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'pages'));

// Configurar las rutas estáticas
app.use('/resources/css', express.static(path.join(__dirname, 'resources/css')));
app.use('/resources/imagenes', express.static(path.join(__dirname, 'resources/imagenes')));
app.use(express.static(path.join(__dirname, 'src/pages')));

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas de la API y enrutadores
app.use("/api", authRoutes);
app.use('/', indexRouter);

export default app;
