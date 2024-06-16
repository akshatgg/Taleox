
import { useState } from "react";
// import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";


function Editprofile(){
 const dispatch=useDispatch()
 const [previewImage,setImagePreview]=useState("");

   const [data,setdata]=useState({
    name:"",
    number:"",
    avatar:undefined,
    userID:useSelector((state)=> state?.auth?.data?.__id)

   })


   const handlegetImage=(event)=>{
    event.preventDefault();

    const uploadimage=event.target.files[0];

    if(uploadimage){
        setdata({
            ...data,
            avatar: uploadimage,
        });
    }
     const fileReader=new FileReader();
     fileReader.readAsDataURL(uploadimage);
     fileReader.addEventListener("load",function(){
        setImagePreview(this.result);
     })
   }


   const handlegetuser=async(e)=>{
   const {name, value}=e.target; 
   const newuserdata={
    ...data,
    [name]:value
   }


   
   

}
 

    return (
        <div className="h-[90vh] bg-black">
            <div className="">

            </div>
        </div>
    )
}



export default Editprofile;