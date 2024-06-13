import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getuser } from "../../Redux/Slices/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);
  async function loadprofile() {
    await dispatch(getuser());
  }
  useEffect(() => {
    loadprofile();
  }, []);

  return (
    <div className="h-[90vh] bg-black flex justify-center items-center">
      <div className="max-h-[1000px]  p-8 flex flex-col space-y-3  shadow-[#44433B] shadow-2xl ">
        <div className="flex justify-center">
          <img
            className="max-w-[300px] rounded-full"
            src={userData?.avatar?.secure_url}
          />
        </div>
        <h1 className="text-white flex justify-center text-2xl">
          {userData?.name}
        </h1>

        <div className="grid grid-cols-2 p-1  text-white">
          <div className="col-span-1 p-1">Email</div>
          <div className="col-span-1 p-1">{userData?.email}</div>

          <div className="col-span-1 p-1">Contact no.</div>
          <div className="col-span-1 p-1">{userData?.number}</div>

          <div className="col-span-1 p-1">Role</div>
          <div className="col-span-1 p-1">{userData?.role}</div>

          <div className="col-span-1 p-1">Username</div>
          <div className="col-span-1 p-1">{userData?.username}</div>

          <div className="col-span-1 p-2 bg-[#C08C2F] flex justify-center items-center hover:bg-[#e0b943]">
            <button>Change Password</button>
          </div>
          <div className="col-span-1 p-2 bg-[#C08C2F] ml-2 flex justify-center items-center hover:bg-[#DCB643]">
            <button>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;






















// import React, { useState } from "react";
// import { toast } from "react-hot-toast";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { BsPersonCircle } from "react-icons/bs";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import { getUserData, updateProfile } from "../../Redux/authSlice";

// const EditProfile = () => {
//   const dispatch = useDispatch();
//   const [previewImage, setImagePreview] = useState("");

//   const [data, setData] = useState({
//     fullName: "",
//     avatar: undefined,
//     userID: useSelector((state) => state?.auth?.data?._id),
//   });

//   // function to handle the image upload
//   const getImage = (event) => {
//     event.preventDefault();
//     // getting the image
//     const uploadedImage = event.target.files[0];

//     // if image exists then getting the url link of it
//     if (uploadedImage) {
//       setData({
//         ...data,
//         avatar: uploadedImage,
//       });
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(uploadedImage);
//       fileReader.addEventListener("load", function () {
//         setImagePreview(this.result);
//       });
//     }
//   };

//   // function to set the name of user
//   const setName = (event) => {
//     const { name, value } = event.target;
//     const newUserData = { ...data, [name]: value };
//     setData(newUserData);
//   };

//   // function to handle the form submission
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // checking for the empty field
//     if (!data.fullName || !data.avatar) {
//       toast.error("All fields are mandatory");
//       return;
//     }

//     // checking the length of name
//     if (data.fullName.length < 5) {
//       toast.error("Name should have more than 5 characters");
//       return;
//     }

//     // creating the form data from the existing data
//     const formData = new FormData();
//     formData.append("fullName", data.fullName);
//     formData.append("avatar", data.avatar);

//     const newUserData = [data.userID, formData];

//     // dispatching the api call using the thunk
//     await dispatch(updateProfile(newUserData));

//     // fetching the data to update
//     await dispatch(getUserData());
//   };

//   return (
//     <Layout>
//       <div className="flex items-center justify-center h-[100vh]">
//         <form
//           onSubmit={handleFormSubmit}
//           className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 h-[26rem] shadow-[0_0_10px_black]"
//         >
//           <h1 className="text-center text-2xl font-bold">Edit Profile Page</h1>

//           {/* input for image file */}
//           <label className="cursor-pointer" htmlFor="image_uploads">
//             {previewImage ? (
//               <img
//                 className="w-28 h-28 rounded-full m-auto"
//                 src={previewImage}
//                 alt="preview image"
//               />
//             ) : (
//               <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
//             )}
//           </label>
//           <input
//             onChange={getImage}
//             className="hidden"
//             type="file"
//             id="image_uploads"
//             name="image_uploads"
//             accept=".jpg, .jpeg, .png"
//           />

//           <div className="flex flex-col gap-1">
//             <label className="text-lg font-semibold" htmlFor="fullName">
//               Full Name
//             </label>
//             <input
//               required
//               type="text"
//               name="fullName"
//               id="fullName"
//               placeholder="Enter your full name"
//               className="bg-transparent px-2 py-1 border"
//               value={data.fullName}
//               onChange={setName}
//             />
//           </div>

//           <Link to={"/user/profile"}>
//             <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
//               <AiOutlineArrowLeft /> Back to Profile
//             </p>
//           </Link>

//           <button
//             className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
//             type="submit"
//           >
//             Update Profile
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default EditProfile;