
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Link} from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"; 


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
        <div className="bg-black h-[90vh] overflow-hidden">
          
            <div className="flex justify-center items-center">
          <Box
            onSubmit={(e) => {
              e.preventDefault(); 
              // handle(); 

            }}
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "35ch",
                "&:hover": {
                  "& .MuiInputBase-input": {
                    color: "gray", // Change text color to gray on hover
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "gray", // Change border bottom color to gray on hover
                  },
                },
              },
              "& .MuiInputLabel-root": {
                color: "white", // Set placeholder color to white
              },
              "& .MuiTextField-root .MuiInputBase-input": {
                color: "white", // Set text color to white
              },
              "& .MuiTextField-root .MuiInput-underline:before": {
                borderBottomColor: "white", // Set border bottom color to white
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "white",
                border: "1px solid gray",
              },
              "& .MuiFilledInput-root:hover": {
                borderColor: "white",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                borderColor: "white",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div className=" rounded-2xl   flex justify-center items-center align-middle p-[100px]">
              <div className="shadow-[0_0_10px_gray] p-16">
                <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-white " />
                <div className="flex justify-center">
                  <TextField
                    id="name"
                    label="Name"
                    variant="standard"
                    name="name"
                    value={setdata.name}
                    onChange={handlegetuser}
                
                  />
                </div>
                <div className="flex justify-center">
                  <TextField
                    id="number"
                    label="Number"
                    variant="standard"
                    name="number"
                    value={number}
                    onChange={handlegetuser}
          
                  />
                </div>

                <div className="flex justify-center">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Terms & Policy"
                    className="text-white"
                  />
                </div>
              
                <div className="flex justify-center">
                  <button className="bg-[#4CB5F9] px-[120px] py-3 rounded-xl text-white font-semibold mt-3 hover:bg-[#4c97f9]" >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </div>
            </div>
        
    )
}



export default Editprofile;