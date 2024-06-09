import { useState } from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewimage, setpreviewimage] = useState("");
  const [userinput, setuserinput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageupload(e) {
    e.preventDefault();
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      setuserinput({
        ...userinput,
        thumbnail:uploadImage,
      });


      const fileReader=new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load",function(){
        setpreviewimage(this.result)
      })      
    }
  }



  function handleuserInput(e){
    const {name,value}=e.target;
    setuserinput({
        ...userinput,
        [name]:value,
    })
  }

  

  function handleformSubmit(e){
    e.preventDefault();
    
    
  }

  return <>Create Courses</>;
}

export default CreateCourses;
