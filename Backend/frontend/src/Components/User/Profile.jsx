import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getuser } from "../../Redux/Slices/AuthSlice";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);


    useEffect(()=>{
        dispatch(getuser())
    },[])


return (
    <div>
    

    </div>
)



}

export default Profile;
