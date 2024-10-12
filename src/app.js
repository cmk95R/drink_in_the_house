import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/auth.routes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use('/resources/css', express.static(path.join(__dirname, 'resources/css')));
app.use('/resources/imagenes', express.static(path.join(__dirname, 'resources/imagenes')));

app.use(express.static(path.join(__dirname, 'src/pages')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api",authRoutes)


app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

export default app;