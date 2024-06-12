import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helper/axiosinstance.js";
const initialState = {
    isloggedin: localStorage.getItem("isloggedin") || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || ""
};

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {
        let res = axiosInstance.post("user/register", data);
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create an account",
        })

        res = await res;
        return res.data;
    }

    catch (error) {
        toast.error(error.message);
    }
})

export const signinAccount = createAsyncThunk("auth/signin", async (data) => {
    try {
        let res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        })
        res = await res;
        return await (res).data;
    }
    catch (e) {
        toast.error(e.message);
    }
})


export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        let res = axiosInstance.post("user/logout");
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out"
        })

        res = await res;
        return res.data;
    }

    catch (e) {
        toast.error(e.message);
    }
})



export const getuser = createAsyncThunk("auth/getuser", async (data) => {
    try {
        let res = axiosInstance.get("user/me", data);
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data.message;
            },
            error: "Failed to fetch your data"
        })
        res = await res;
        return res.data;
    }
    catch (e) {
        toast.error(e.message)
    }

})



export const changePassword = createAsyncThunk("auth/changepassword", async (userpassword) => {
    try {
        let res = axiosInstance.post("user/change-password", userpassword);
        await toast.promise(res, {
            loading: "Loading",
            success: (data) => {
                return data?.data.message;
            },
            error: "Failed to change password"
        })
        res = await res;
        return res.data;
    }
    catch (e) {
        toast.error(e.message);
    }
})



export const forgotPassword = createAsyncThunk("auth/forgotpassword", async (email) => {
    try {
        let res = axiosInstance.post("user/reset-password", { email });
        await toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to forgot your password"
        })
        res = await res;
        return (await res).data;
    }
    catch (e) {
        toast.error(e.message);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // for login
        builder.addCase(signinAccount.fulfilled, (state, action) => {
            const user = action?.payload?.user;

            if (user) {
                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isloggedin", JSON.stringify(true));
                localStorage.setItem("role", user.role);

                state.isloggedin = true;
                state.data = user;
                state.role = user.role;
            } else {
                console.error('User data is undefined');
            }
        });


        // for logout
        //   here is the state is the second storage of redux 
        builder.addCase(logout.fulfilled, (state, action) => {
            localStorage.clear();
            state.isloggedin = false;
            state.data = {};
            state.role = "";
        });



        //   for user data
        builder.addCase(getuser.fulfilled, (state, action) => {
            const user = action?.payload?.user;

            if (user) {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isloggedin", true);
                state.isloggedin = true;
                state.data = user;
                state.role = action?.payload?.user?.role;
            }
            else {
                toast.error("user is not exist");
            }
        })



    }
});


export default authSlice.reducer;























// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import { getUserData } from "../../Redux/authSlice";
// import { cancelCourseBundle } from "../../Redux/razorpaySlice";

// const Profile = () => {
//   const dispatch = useDispatch();

//   const userData = useSelector((state) => state?.auth?.data);

//   // function to handle the cancel subscription of course
//   const handleCourseCancelSubscription = async () => {
//     await dispatch(cancelCourseBundle());
//     await dispatch(getUserData());
//   };

//   useEffect(() => {
//     // getting user details
//     dispatch(getUserData());
//   }, []);
//   return (
//     <Layout>
//       <div className="min-h-[90vh] flex items-center justify-center">
//         <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
//           <img
//             className="w-40 m-auto rounded-full border border-black"
//             src={userData?.avatar?.secure_url}
//             alt="user profile image"
//           />

//           <h3 className="text-xl font-semibold text-center capitalize">
//             {userData.fullName}
//           </h3>

//           <div className="grid grid-cols-2">
//             <p>Email :</p>
//             <p>{userData?.email}</p>
//             <p>Role :</p>
//             <p>{userData?.role}</p>
//             <p>Subscription :</p>
//             <p>
//               {userData?.subscription?.status === "active"
//                 ? "Active"
//                 : "Inactive"}
//             </p>
//           </div>

//           {/* button to change the password */}
//           <div className="flex items-center justify-between gap-2">
//             <Link
//               to={
//                 userData?.email === "test@gmail.com"
//                   ? "/denied"
//                   : "/changepassword"
//               }
//               className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               <button>Change Password</button>
//             </Link>

//             <Link
//               to={
//                 userData?.email === "test@gmail.com"
//                   ? "/denied"
//                   : "/user/editprofile"
//               }
//               className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               <button>Edit Profile</button>
//             </Link>
//           </div>

//           {userData?.subscription?.status === "active" && (
//             <button
//               onClick={handleCourseCancelSubscription}
//               className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               Cancel Subscription
//             </button>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;