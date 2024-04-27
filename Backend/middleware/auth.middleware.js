import apperror from "../utils/error.util.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config(); 

const isloggedIn=async (req,res,next)=>{
const {token}=req.cookies;
 
if(!token){
    return next(new apperror('Unauthenticated',401))
}


const userdetails=await jwt.verify('token', process.env.jwt_SECRET);
 
req.user=userdetails;
 
next();
}

export{
    isloggedIn
}
