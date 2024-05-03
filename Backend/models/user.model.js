import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [20, 'Name cannot exceed 20 characters'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [6, 'Password should be at least 6 characters long'],
        maxlength: [50, 'Password cannot exceed 50 characters'],
        trim: true,
        select: false
    },
    confirmpass: {
        type: String,
        minlength: [6, 'Password should be at least 6 characters long'],
        maxlength: [50, 'Password cannot exceed 50 characters'],
        trim: true
    },
    username:{
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    number: {
      type: Number,
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiryDate: {
        type: Date
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.isModified('confirmpass')) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpass = await bcrypt.hash(this.confirmpass, 10);
        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods = {
    generateJWTToken: function () {
        return jwt.sign(
            { id: this._id, email: this.email, role: this.role },
            process.env.jwt_SECRET,
            { expiresIn: '3d' }
        );
    },
    comparePassword: async function (plainTextPassword) {
        return await bcrypt.compare(plainTextPassword, this.password);
    },

    generatePasswordResetToken: async function(){
        const resetToken =crypto.randomBytes(20).toString('hex');

        this.forgotPasswordToken= crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')
        
        this.forgotPasswordExpiry=Date.now() +15*60*1000; //15min from now
   
   return resetToken;
    }
};
const User = model('User', userSchema);
export default User;
