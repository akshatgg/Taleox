import { useDispatch, useSelector,useNavigate } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import toast from "react-hot-toast";
import { getuser, updateprofile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userID = useSelector((state) => state?.auth?.data?._id);
  const [previewImage, setImagePreview] = useState("");
  const [data, setData] = useState({
    name: "",
    number: "",
    avatar: undefined,
  });

  const handleGetImage = (event) => {
    event.preventDefault();
    const uploadImage = event.target.files[0];
    if (uploadImage) {
      setData({
        ...data,
        avatar: uploadImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  const handleGetUser = (e) => {
    const { name, value } = e.target;
    const newUserData = {
      ...data,
      [name]: value,
    };
    setData(newUserData);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    if (!data.name || !data.number) {
      toast.error("Please fill every field");
      return;
    }
    console.log('User ID from Redux:', userID);


    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('number', data.number);
    formData.append('avatar', data.avatar);

    const newUserData = {
      id: userID,
      data: formData,
    };

    await dispatch(updateprofile(newUserData));
    await dispatch(getuser());
    navigate('/Profile')
  };

  return (
    <div className="bg-black h-[90vh] overflow-hidden">
      <div className="flex justify-center items-center">
        <Box
          component="form"
          onSubmit={formSubmit}
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width: "35ch",
              "&:hover": {
                "& .MuiInputBase-input": {
                  color: "gray",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "gray",
                },
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiTextField-root .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiTextField-root .MuiInput-underline:before": {
              borderBottomColor: "white",
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
          <div className="rounded-2xl flex justify-center items-center align-middle p-[100px]">
            <div className="shadow-[0_0_10px_gray] p-16">
              <label htmlFor="image_uploads" className="cursor-pointer">
                {
                  previewImage ? (
                    <img
                      className="w-24 h-24 rounded-full"
                      src={previewImage}
                      alt="Preview"
                    />
                  ) : (
                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-white" />
                  )
                }
              </label>
              <input
                className="hidden"
                type="file"
                id="image_uploads"
                accept=".jpg,.png,.jpeg,.svg"
                onChange={handleGetImage}
                name="avatar"
              />
              <div className="flex justify-center">
                <TextField
                  id="name"
                  label="Name"
                  variant="standard"
                  name="name"
                  value={data.name}
                  onChange={handleGetUser}
                />
              </div>
              <div className="flex justify-center">
                <TextField
                  id="number"
                  label="Number"
                  variant="standard"
                  name="number"
                  value={data.number}
                  onChange={handleGetUser}
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
                <button
                  type="submit"
                  className="bg-[#4CB5F9] px-[120px] py-3 rounded-xl text-white font-semibold mt-3 hover:bg-[#4c97f9]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default EditProfile;
