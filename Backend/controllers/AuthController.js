import { comparePassword, hashPassword } from "../helper/authHelper.js";
import User  from "../models/UserModel.js"
import jwt from "jsonwebtoken"
export const registerUserController = async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        if (!name) {
            res.status(200).send({
              success: false,
              message: "Name cannot be empty",
            });
          }
          if (!email) {
            res.status(200).send({
              success: false,
              message: "Email cannot be empty",
            });
          }
          if (!password) {
            res.status(200).send({
              success: false,
              message: "Password cannot be empty",
            });
          }
          const isUser = await User.findOne({email});
          if(isUser){
            return res.status(400).send({
                success: false,
                message: "user already exist",
              });
          }
          else{
            const hashedPassword = await hashPassword(password)
            const saveUser = await new User({
                name, email, password: hashedPassword
            }).save()
            if(saveUser){
                res.status(201).send({message: "User Registered", saveUser})
            }
          }
    } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
          error
        });
    }
}

//login user
export const loginUserController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email) {
            res.status(200).send({
              success: false,
              message: "Email cannot be empty",
            });
          }
          if (!password) {
            res.status(200).send({
              success: false,
              message: "Password cannot be empty",
            });
          }

          // existing user or not
          const isUser = await User.findOne({email});
          if(!isUser){
            return res.status(400).send({
                success: false,
                message: "user does not exists",
              });
          }
          else{
            const checkUser = await User.findOne({email})
            const checkPassword = await comparePassword(password, checkUser.password );
            if (!checkPassword) {
                return res.status(200).send({
                  success: false,
                  message: "Invalid Credentials",
                });
          }
          const token = await jwt.sign({_id: checkUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "80d"
         })
         res.status(201).send({
            success: true, 
            message: "Logged in... Welcome back partner!",
            user: {
                name: checkUser.name,
                email: checkUser.email,
                role: checkUser.role
            },
            token
         })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
    }
}