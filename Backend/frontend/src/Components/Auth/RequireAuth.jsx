import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isloggedin, role } = useSelector((state) => state.auth);
  const location = useLocation();

  return isloggedin && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isloggedin ? (
    <Navigate to={"/Denied"} state={{ from: location }} replace />
    ) : (
        <Navigate to={"/Signin"} state={{ from: location }} replace />
  );
};


export default RequireAuth;