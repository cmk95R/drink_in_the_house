import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import mConfirmacion from "./routes/mConfirmacion.routes.js";
import mReestablecer from "./routes/mReestablecer.routes.js";
import authRoutes from "./routes/auth.routes.js"

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(mConfirmacion);
app.use(mReestablecer);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api",authRoutes)

export default app;

//Sirve para entender los datos que llegan del formulario convirtiendolo en objetos, si se quita, el servidor no entiende el cuerpo de la petición.
//app.use(express.json());//El servidor va a entender los datos en formato json (si es que vamos a trabajar con eso, sino se quita)
//app.use(require(mConfirmacion));//usa el js de la carpeta "routes", en este caso mail de confirmación
//app.use(require(mReestablecer));//lo mismo pero para reestablecer cuenta
//app.use(express.static(path.join(__dirname, 'public')));