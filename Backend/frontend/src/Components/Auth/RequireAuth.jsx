import { UseSelector, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth( {allowedRoles} ){
const{isloggedin,role}=useSelector((state)=>state.auth);

return isloggedin && allowedRoles.find((myRole)=> myRole == role)?(
<Outlet/>
):isloggedin?(<Navigate to="/denied"/>):(<Navigate to="/Signin"/>)

}
export default RequireAuth;