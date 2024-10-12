import User from '../models/user.model.js';  
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createAccessToken } from "../libs/jwt.js";


export const register = async (req, res) => {
    console.log("Registro en curso");

    const { username, email, password, phoneNumber, address } = req.body;

    console.log(username, email, password, phoneNumber, address);

    try {
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

        // Redirigir a la página de confirmación después del registro 
        res.redirect("/api/confirm");
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
export const login = async (req, res) => {

    const {email, password} = req.body
    console.log(email , password);

try {

    const userFound = await User.findOne({email})

    if(!userFound) return res.status(404).json({message: "Usuario no encontrado"})

    const isMatch = await bcrypt.compare(password,userFound.password)
    if(!isMatch) return res.status(404).json({message: "Contraseña incorrecta"})


        const token = await createAccessToken({id:userFound._id})

        res.cookie("token",token)
        res.json({
        id:userFound.id,
        username: userFound.username,
        email: userFound.email,
        phoneNumber: userFound.phoneNumber,
        address: userFound.address,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
        }); 

    }   catch (error) {
        res.status(500).json({message:error.message});
        }   
}

export const logout = (req, res) => {

    res.cookie("token","", {
        expires: new Date(0)
    })
    return res.sendStatus(200)

}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    if (!userFound)  return res.status(400).json({message:"Usuario no encontrado"})
    
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            phoneNumber: userFound.phoneNumber,
            address: userFound.address,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    res.send("profile")
}   