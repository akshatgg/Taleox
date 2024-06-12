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
      <div className="max-h-[900px] border p-8 flex flex-col  shadow-[#44433B] shadow-2xl ">
        <div className="flex justify-center">
          <img
            className="max-w-[200px] rounded-full"
            src={userData?.avatar?.secure_url}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
