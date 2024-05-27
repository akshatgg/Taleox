import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Lottie from "lottie-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs"; // import { Redirect } from "react-router-dom";
import animation from "../../assets/Animation - 1712774736687.json";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { createAccount } from "../../Redux/Slices/AuthSlice.js";

const Signup = () => {

  // const [error, seterror] = useState("");
  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");
  // const [username, setusername] = useState("");
  // const [name, setname] = useState("");
  // const [confirmpass, setconfirmpass] = useState("");
  // const [number, setnumber] = useState("");
  // const [divert, setdivert] = useState(false);
  // const [previewimage, setpreviewimage] = useState("");
  // const [avatar,setAvatar] =useState("")
  // sessionStorage.setItem("login", JSON.stringify(false));

  // const handleAvatarChange = (e) => {
  //   // Update the state with the selected avatar file
  //   setAvatar(e.target.files[0]);
  //   // Preview the selected image
  //   setpreviewimage(URL.createObjectURL(e.target.files[0]));
  // };

  // const handle = async () => {
  //   if (!email || !password || !confirmpass || !username || !number) {
  //     alert("Please fill every field");
  //     seterror("Please fill every field");
  //     return;
  //   }

  //     try {
  //       const formData = new FormData();
  //       formData.append('email', email);
  //       formData.append('password', password);
  //       formData.append('confirmpass', confirmpass);
  //       formData.append('username', username);
  //       formData.append('number', number);
  //       formData.append('name', name);
  //       formData.append('avatar', avatar);

  //       const response = await Axios.post(
  //         "http://localhost:5000/api/auth/user/register",
  //         formData,
  //         {
  //           headers: {
  //             'Content-Type': 'multipart/form-data'
  //           }
  //         }
  //       );

  //     if (response.status === 201) {
  //       alert("Sign up successful");
  //       console.log("Sign up successful");
  //       console.log(response);
  //       console.log(formData);

  //       setdivert(true);

  //     }
  //     else {
  //       alert("Sign up failed");
  //       console.log("Sign up failed");
  //     }

  //   } catch (error) {
  //     console.error("Error:", error);
  //     seterror("Error during sign up");
  //     alert(error);
  //   }
  // };


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewimage, setpreviewimage] = useState("");
  const [signupData, setsignupData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpass: "",
    number: "",
    avatar: "",
  });

  function handleuserInput(e) {
    const { name, value } = e.target;
    setsignupData({
      ...signupData,
      [name]: value,
    });
  }

  function handleimage(event) {
    event.preventDefault();
    const uploadImage = event.target.files[0];

    if (uploadImage) {
      setsignupData({
        ...signupData,
        avatar: uploadImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setpreviewimage(this.result);
      });
    }
  }

  async function createnewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.username || !signupData.number || !signupData.name) {
      toast.error("Please fill every field");
      return;
    }

    if (signupData.name.length < 5) {
      toast.error("Name length should be greater than 5");
      return;
    }

    if (!signupData.email.match(signupData.email)) {
      toast.error("Email format is not valid");
      return;
    }

    if (!signupData.password.match(signupData.password)) {
      toast.error("Password should be minimum eight characters, at least one letter, one number, and one special character");
      return;
    }

    if (signupData.password !== signupData.confirmpass) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('email', signupData.email);
    formData.append('password', signupData.password);
    formData.append('confirmpass', signupData.confirmpass);
    formData.append('username', signupData.username);
    formData.append('number', signupData.number);
    formData.append('name', signupData.name);
    formData.append('avatar', signupData.avatar);

    const res = await dispatch(createAccount(formData));

    if (res?.payload?.success) navigate("/login");

    setsignupData({
      name: "",
      email: "",
      number: "",
      avatar: "",
      username: "",
      password: "",
      confirmpass: ""
    });
    setpreviewimage("");
  }

  return (
    <div className="bg-[#000000] h-screen">
      <h1 className="text-white flex justify-center text-3xl font-bold ">
        Registration Page
      </h1>
      <div className="flex justify-center items-center">
        <div className="flex justify-center min-w-[30%]">
          <Lottie
            animationData={animation}
            loop
            autoplay
            style={{ maxWidth: "100%" }} // Make sure animation fills its container
          />
        </div>
        <div className="max-w-[50%]">
          <Box
            component="form"
            onSubmit={createnewAccount}
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
            <div className="rounded-2xl p-[100px]">
              <div className="shadow-[0_0_10px_gray] p-8">
                <div className="">
                  <label htmlFor="image_uploads" className="cursor-pointer">
                    {previewimage ? (
                      <img
                        className="w-24 h-24 rounded-full"
                        src={previewimage}
                      />
                    ) : (
                      <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-white" />
                    )}
                  </label>
                  <input
                    className="hidden"
                    type="file"
                    id="image_uploads"
                    accept=".jpg,.png,.jpeg,svg"
                    onChange={handleimage}
                    name="avatar"
                  />

                  <TextField
                    id="full-name"
                    label="Full Name"
                    variant="standard"
                    name="name"
                    onChange={handleuserInput}
                    value={signupData.name}
                  />
                </div>
                <div className="">
                  <TextField
                    id="user-name"
                    label="User Name"
                    variant="standard"
                    name="username"
                    onChange={handleuserInput}
                    value={signupData.username}
                  />
                </div>
                <div className="">
                  <TextField
                    id="number"
                    label="Number"
                    variant="standard"
                    name="number"
                    onChange={handleuserInput}
                    value={signupData.number}
                  />
                </div>
                <div className="">
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    name="email"
                    onChange={handleuserInput}
                    value={signupData.email}
                  />
                </div>
                <div className="">
                  <TextField
                    id="password"
                    label="Password"
                    variant="standard"
                    name="password"
                    onChange={handleuserInput}
                    value={signupData.password}
                  />
                </div>
                <div className="">
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    variant="standard"
                    name="confirmpass"
                    onChange={handleuserInput}
                    value={signupData.confirmpass}
                  />
                </div>

                <div className="">
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Terms & Policy"
                    className="text-white"
                  />
                </div>
                <Link to="/Signin">
                  <div className="text-white hover:text-gray-300 flex justify-center">
                    Already have an account
                  </div>
                </Link>
                <div className="flex justify-center">
                  <button
                    className="bg-[#4CB5F9] hover:bg-[#4c97f9] px-[120px] py-3 rounded-xl text-white font-semibold mt-3"
                    type="submit"
                  >
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
