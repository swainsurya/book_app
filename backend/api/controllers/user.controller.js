import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.status(404).json({
            message: "All fields are necessary"
        })
    }
    try {
        const userExist = await userModel.findOne({email});
        if(userExist){
            return res.status(400).json({
                message: "Email Already Exists",
                status: false
            })
        }

        const extistUsername = await userModel.findOne({username});
        if(extistUsername){
            return res.status(400).json({
                message: "Username already exists",
                status: false
            })
        }

        // get the profile image 
        const profileImage = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`

        const hashedPass = bcrypt.hashSync(password,10);
        const user = new userModel({email, username,password: hashedPass,profileImage});
        await user.save();
        return res.status(200).json({
            message: "Registration Success",
            status: true,
            user: {
                id: user._id,
                uname: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error in server",
            error
        })
    }
}

export const login = async(req,res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const comparePass = await bcrypt.compareSync(password, user.password);
    if(!comparePass) {
        return res.status(404).json({
            message: "Password not match"
        })
    }
    const token = await jwt.sign({userId: user._id},process.env.JWT_KEY,{"expiresIn": "2d"});
    return res.status(200).json({
        message: "Login Success",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            profileImage: user.profileImage
        },
        token
    })
}