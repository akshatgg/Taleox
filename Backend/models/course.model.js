import { Schema,model } from "mongoose";
const courseSchema= new Schema({
 title:{
    type:String,
    required:[true,'Title is required'],
    minLength:[8,"Title must be atleast 8 character"],
    maxLength:[59,'Title should be less than 60 characters'],
    trim:true,
 },


 description:{
    type:String,
    required:[true,'Title is required'],
    minLength:[8,"Title must be atleast 8 character"],
    maxLength:[200,'Title should be less than 200 characters'],
 },


 category:{
    type:String,
    required:[true,'Title is required'],

 },


 thumbnail:{
    public_id: {
        type: String,
        
    },
    secure_url: {
        type: String,
    }
 },


 lectures:[
    {
        title:String,
        description:String,
        lectures:{
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            }
        }
    },

 ],
 numbersOfLectures:{
    type: String,
    required:[true,'Title is required'],

 },
 created:{
    type:String,
    required:[true,'Title is required'],
 }

},{
    timestamps:true
})

const Course=model('Course',courseSchema);
export default Course;