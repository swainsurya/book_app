import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuth = async(req, res, next) => {
    const {token} = req.body;
    if(!token){
        return res.status(400).json({
            message: "Unauthorized User",
            status: false
        })
    }
    try {
        const decode = await jwt.decode(token,process.env.JWT_KEY);
        if(!decode){
            return res.status(400).json({
                message: "Please re login",
                status: false
            })
        }
        const userId = decode.userId;
        req.userId = userId;
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Middleware error",
            status: false
        })
    }
}