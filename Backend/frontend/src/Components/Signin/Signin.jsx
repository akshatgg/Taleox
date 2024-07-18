import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Lottie from "lottie-react";
import { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"; 
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signinAccount } from "../../Redux/Slices/AuthSlice";
import animation from "../../assets/Animation - 1712774736687.json";

const Signin = () => {
  // const [error, seterror] = useState("");
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");

  // const handle = async () => {
  //   if (!email && !password) {
  //     seterror("please fill every fields");
  //     return;
  //   } else {
  //     try {
  //       const userdata = {
  //         email: email,
  //         password: password,
  //       };

  //       const response = await Axios.post(
  //         "http://localhost:5000/api/auth/user/login",
  //         userdata
  //       );

  //       if (response) {
  //         alert("Signin succcessfully");
  //         console.log(response);
  //         console.log(userdata);
  //         console.log("login successfully");
  //         sessionStorage.setItem("login", JSON.stringify(true));
  //         window.location.reload();
  //       } else {
  //         console.log("login unsuccessfull");
  //       }
  //     } catch (er) {
  //       console.error("Error:", er);
  //       seterror("Error during login");
  //     }
  //   }
  // };
const dispatch=useDispatch();
const navigate=useNavigate();
     
  const [signinData,setsigninData]=useState({
    email:"",
    password:""
  });
     
  function handleInput(e){
const {name,value}=e.target;
setsigninData({
  ...signinData,
  [name]:value,
})
  }
    
   async function loginprocess(event){
    event.preventDefault();
   if(!signinData.email || !signinData.password){
    toast.error("Please fill every field");
    return
   }
   
   
   const res= await dispatch(signinAccount(signinData))
   
   if(res?.payload?.success) navigate("/");
  
   setsigninData({
    email:"",
    password:""
   })
  
  }
  return (
    <div className="bg-[#000000] h-screen">
      <h1 className="flex justify-center text-3xl font-bold text-white mb-10">
        Sign in
      </h1>
      <div className=" flex justify-center item-center  ">
        <div className="flex justify-center min-w-[30%]">
          <Lottie
            animationData={animation}
            loop
            autoplay
            style={{ maxWidth: "100%" }} // Make sure animation fills its container
          />
        </div>
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
                    id="email"
                    label="Email"
                    variant="standard"
                    name="email"
                    onChange={handleInput}
                    value={signinData.email}
                  />
                </div>
                <div className="flex justify-center">
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    name="password"
                    onChange={handleInput}
                    value={signinData.password}
                  />
                </div>

                <div className="flex justify-center">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Terms & Policy"
                    className="text-white"
                  />
                </div>
                <div className="text-white flex justify-center hover:text-gray-300">
                  Forgot your Password?
                </div>
                <Link to="/Signup">
                  <div className="text-white flex justify-center mt-3 hover:text-gray-300">
                    Do not have an account?{" "}
                    <span className="text-[#0095F6] text-[18px] font-semibold">
                      Sign up
                    </span>
                  </div>
                </Link>
                <div className="flex justify-center">
                  <button className="bg-[#4CB5F9] px-[120px] py-3 rounded-xl text-white font-semibold mt-3 hover:bg-[#4c97f9]" onClick={loginprocess}>
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Signin;
