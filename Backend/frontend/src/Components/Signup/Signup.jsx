
import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import Lottie from "lottie-react";
import  { useState } from "react";
import { Link } from "react-router-dom";

// import { Redirect } from "react-router-dom";
import animation from "../../assets/Animation - 1712774736687.json";

const Signup = () => {
  const [error, seterror] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username,setusername]=useState("");
  const [name,setname]=useState("");
  const [confirmpass,setconfirmpass]=useState("");
  const [number,setnumber]=useState("");
  const [divert ,setdivert]=useState(false)
  sessionStorage.setItem("login", JSON.stringify(false));
 
 
  
  
  const loginstate = JSON.parse(sessionStorage.getItem("login"));
  const changelogin = () => {
    sessionStorage.setItem("login", JSON.stringify(!loginstate));
  };
  
  const handle = async () => {
    if (!email || !password || !confirmpass || !username || !number) {
      alert("Please fill every field");
      seterror("Please fill every field");
      return;
    }
  //  const userExist=await User.findOne{{email}};
  //  if(userExist){
  //   alert("User already exist");
  //   return ;
  //  }
    try {
      const userdata = {
        email: email,
        password: password,
        confirmpass: confirmpass,
        username: username,
        number: number,
        name: name,
      };
  
     const response = fetch('/api/auth/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      })
      

      if (response.status === 201) {
        alert("Sign up successful");
        console.log("Sign up successful");
        console.log(response);
        console.log(userdata);
        changelogin();
        setdivert(true);
       
      } else {
        alert("Sign up failed");
        console.log("Sign up failed");
      }
    } catch (error) {
      console.error("Error:", error);
      seterror("Error during sign up");
      alert(error);
    }
  };
  
    
  
  // {divert && <Redirect to="/" />}


  return (

    <div className="bg-[#000000]">
      <div className="h-screen flex justify-center item-center">
        <div className="flex justify-center">
          <Lottie
            animationData={animation}
            loop
            autoplay
            style={{ maxWidth: "650px" }} // Make sure animation fills its container
          />
        </div>
        <div className="flex justify-center items-center min-w-[800px]">
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent default form submission behavior
              handle(); // Call your handle function for signup
            }}
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
            <div className=" rounded-2xl p-[100px] flex justify-center items-center min-h-[200px]">
              <div>
                <div className="flex justify-center">
                  <TextField
                    id="full-name"
                    label="Full Name"
                    variant="standard"
                    onChange={(e)=>setname(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <TextField
                    id="user-name"
                    label="User Name"
                    variant="standard"
                    onChange={(e)=>setusername(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <TextField id="number" label="Number" variant="standard" onChange={(e)=>setnumber(e.target.value)}/>
                </div>
                <div className="flex justify-center">
                  <TextField id="email" label="Email" variant="standard" onChange={(e)=>setemail(e.target.value)} />
                </div>
                <div className="flex justify-center">
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    onChange={(e)=>setpassword(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    variant="standard"
                    onChange={(e)=>setconfirmpass(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-center">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Terms & Policy"
                    className="text-white"
                  />
                </div>
                <Link to="/Signin">
                <div className="text-white hover:text-gray-300 flex justify-center">
                  Already have an account{" "}
                </div>
                </Link>
                <div className="flex justify-center">
                  <button className="bg-[#4CB5F9] hover:bg-[#4c97f9] px-[120px] py-3 rounded-xl text-white font-semibold mt-3" >
                    Sign Up
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

export default Signup;