import apperror from "../utils/error.util.js";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config(); 

const isloggedIn=async (req,res,next)=>{
const {token}=req.cookies;
 
if(!token){
    return next(new apperror('Unauthenticated',401))
}


const userdetails=await jwt.verify(token, process.env.jwt_SECRET);
 
req.user=userdetails;
 
next();
}




const authorizedRoles=(...roles)=>async (req,res,next)=>{
    const currentUserRoles =req.user.role;

    if(!roles.includes(currentUserRoles)){
        return next(new apperror('You do not have a permission',400))
    }
    next();
}




const authorizedSubscriber=(req,res,next)=>{

const subscription =req.user.subscription;
const currentUserRoles =req.user.role;
if(currentUserRoles != 'ADMIN' && subscription.status != 'active'){
    return next(new apperror('Please subscribe to acess this route',403));

}





}
export{
    isloggedIn,
    authorizedRoles,
    authorizedSubscriber
}
