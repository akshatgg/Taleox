import apperror from "../utils/error.util.js";
import User from "../models/user.model.js";
// import emailvalidator from "email-validator";
import cloudinary from 'cloudinary';
import fs from "fs/promises";
import sendEmail from "../utils/sendemail.js";
import crypto from 'crypto';
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
};



const register = async (req, res, next) => {
    try {
        const { name, email, password, confirmpass,username,number ,role} = req.body;

        if (!name || !email || !password || !confirmpass || !username || !number) {
            return next(new apperror('All fields are required', 400));
        }
        if (password !== confirmpass) {
            return next(new apperror("Password and confirm password should be the same",400));
        }
        const userExist = await User.findOne({ email }); 
        if (userExist) {
            return next(new apperror('Email already exists', 400));
        }
    
        const user = await User.create({
            name,
            email,
            password,
            number,
            confirmpass,
            username,
            avatar: { public_id: "olympic_flag" , secure_url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg' },
            role
        });

        if (!user) {
            return next(new apperror('Failed to create user', 400));
        }

        console.log("File Details=>"+JSON.stringify(req.file));
if(req.file){
   try{
    const result = await cloudinary.v2.uploader.upload(req.file.path,{
       folder:'LMS',
       width:250,
       height:250,
       gravity:'faces',
       crop:'fill'
    });
    if(result){
       user.avatar.public_id =result.public_id;
       user.avatar.secure_url=result.secure_url;


    //    remove the file from server aftyer uplaoding in the clloudinary
       fs.rm(`uploads/${req.file.filename}`)
    }
   }


   catch(e){
    console.log(e.message);
    return next(new apperror(error || 'File not uploaded ,please try again'));
   }
}


        await user.save();
        console.log(name,password,email,username);
        // user.password=undefined;

        const token = await user.generateJWTToken();
        res.cookie('token', token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error('User registration error:', error);
        return next(new apperror('User registration failed',500));
    }
};





const login = async(req, res,next) => {
                 
    try{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new apperror('All fields ae required',400))
    }

    const user=await User.findOne({
        email
    }).select('+password');
     
    if(!user || !user.comparePassword(password)){
        return next(new apperror('Email or password does not match',400))
    }
    // user.password=undefined;

    const token=await user.generateJWTToken();
    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success:true,
        message:'user login successfully',
        user,
    })
}
catch(error){
    return next(new apperror(error.message,500))
}

};

const logout = (req, res,next) => {
   res.cookie('token',null,{
    secure:true,
    maxAge:0,
   })
   res.status(200).json({
    success: true,
    message: "Logged out"
});
};



const getProfile = async (req, res,next) => {
    try{
     const userId=req.user.id;
     const user=await User.findById(userId);

     res.status(200).json({
        success: true,
        message: "user details",
        user,
    });

}

  catch(e){
      return next(new apperror('Failed to fetch data',500))
  }
}







const forgotPassword=async (req,res,next)=>{

const {email}=req.body;
if(!email){
    return next(new apperror('Please enter a email',400))

}
console.log(req.body);

const user=await User.findOne({email});

if(!user){
    return next(new apperror('email does not exist',400))
}
console.log(user);
const resetToken=await user.generatePasswordResetToken()

await user.save();


const resetPasswordurl= `${process.env.CLIENT_URL}/reset-password/${resetToken}`
console.log(resetPasswordurl);
const subject="Reset Password"
const message=`You can reset your password by clicking on <a href=${resetPasswordurl} target="_blank">Reset Your Password</a>\n If the above link is not working then copy the link and paste on your new tab ${resetPasswordurl} `;
try{
    await sendEmail(email,subject,message);
    res.status(200).json({
        success:true,
        message:`Reset password token has been sent to ${email} successfully`
    })
}
catch(e){
    user.forgotPasswordExpiryDate=undefined;
    user.forgotPasswordToken=undefined;
    
    await user.save();
    return next(new apperror(e.message,500));
}
}





const resetPassword=async(req, res, next)=>{
    const {resetToken} =req.params;

    const {password}=req.body;

    const forgotPasswordToken=crypto
    .createHash('sha256')
    .update(resetToken) 
    .digest('hex')

    const user=await User.findOne({
        forgotPasswordToken,
        forgotPasswordExpiryDate:{ $gt : Date.now() }
    });

    if(!user){
        return next(new apperror("Token expiry time reached",400));
    }
    user.password=password;
    user.forgotPasswordToken=undefined;
    user.forgotPasswordExpiryDate=undefined;
    user.save();


    res.status(200).json({
        success:true,
        message:"your password is been changed successfully"
    })
}






const changePassword=async(req,res,next)=>{
  const { oldPassword , newpassword}= req.body;
  const {id} =req.user;
  
  if(!oldPassword && !newpassword){
    return next(new apperror("fill every fields" ,400))
  }
  
const user=await User.findById(id).select('+password');
  if(!user){
    return next(new apperror("Token expiry time reached",400));

  }
  const isPasswordValid =await user.comparePassword(oldPassword);
  
  if(!isPasswordValid){
    return next(new apperror("Password does not match",400));

  }
user.password=newpassword;
await user.save();
user.password=undefined;

res.status(200).json({
    success:true,
    message:"your password is been changed successfully"
})

}






const updateuser =async (req,res,next)=>{
const {fullName}=req.body;
const {id}=req.user.id;

const user= await User.findById(id);
if(!user){
    return next(new apperror("Token expiry time reached",400));

}
if(req.fullName){
    user.fullName=fullName;
}
if(req.file){
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try{
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
           folder:'LMS',
           width:250,
           height:250,
           gravity:'faces',
           crop:'fill',
           role: ADMIN || role,
        });
        if(result){
           user.avatar.public_id =result.public_id;
           user.avatar.secure_url=result.secure_url;
    
    
        //    remove the file from server aftyer uplaoding in the clloudinary
           fs.rm(`uploads/${req.file.filename}`)
        }
       }
    
    
       catch(e){
        console.log(e.message);
        return next(new apperror(error || 'File not uploaded ,please try again'));
       }
}

await user.save();
res.status(200).json({
    success:true,
    message:"Profile updated successfully"
})
}








const getAllIds= async (req,res,next)=>{
    try{
        const IDs = await User.find({}).select('-password -confirmpass');        res.status(200).json({
            success:true,
            message:"All IDS",
            IDs,
        });
    }
    catch(e){
        return next(new apperror(e.message,500));
    }
    
}



export { register, login, logout, getProfile, forgotPassword , resetPassword, changePassword, updateuser, getAllIds};




