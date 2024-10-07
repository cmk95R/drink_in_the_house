import User from '../models/user.model.js';  
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {

        const {username,email, password,phoneNumber, address} = req.body
        console.log(username , email , password,phoneNumber,address);
    
    try {

        const passwordHash = await bcrypt.hash(password,10)
        const newUser = new User({
            username,
            email,
            password: passwordHash,
            phoneNumber,
            address:{
            street: address.street,
            city: address.city,
            province: address.province,
            postalCode:address.postalCode
        }    
        })
            const userSaved = await newUser.save()

            jwt.sign({
                id: userSaved._id,
            },"secret123",
        {
            expiresIn: "1d",
        },
        (err,token) => {
            if (err) console.log(err)
                res.cookie("token",token)
                res.json({
                    message: "Usuario creado Anasheee"
                })
        }
    )

            /* res.json({
                id:userSaved.id,
                username: userSaved.username,
                email: userSaved.email,
                phoneNumber: userSaved.phoneNumber,
                address: userSaved.address,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt
            }) */

        }   catch (error) {
            console.log(error)
            }   
}


export const login = (req, res) => res.send('login')
