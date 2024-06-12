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
      <div className="max-h-[1000px] border p-8 flex flex-col space-y-3  shadow-[#44433B] shadow-2xl ">
        <div className="flex justify-center">
          <img
            className="max-w-[200px] rounded-full"
            src={userData?.avatar?.secure_url}
          />
        </div>
        <h1 className="text-white flex justify-center">{userData?.name}</h1>

        <div className="grid grid-cols-2 border p-1 text-white">
        <div className="col-span-1 p-1">
          Email
        </div>
        <div className="col-span-1 p-1">
            {userData?.email}
        </div>

        <div className="col-span-1 p-1">
          Contact no.
          </div>
          <div className="col-span-1 p-1">
              {userData?.number}
          </div>

          <div className="col-span-1 p-1">
          Role
          </div>
          <div className="col-span-1 p-1">
              {userData?.role}
          </div>

          <div className="col-span-1 p-1">
          Username
          </div>
          <div className="col-span-1 p-1">
              {userData?.username}
          </div>

    </div>
      </div>
    </div>
  );
}

export default Profile;
