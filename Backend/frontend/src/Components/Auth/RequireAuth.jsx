import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const location = useLocation();

  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
      <Navigate to={"/Signin"} state={{ from: location }} replace />
      ) : (
      <Navigate to={"/Denied"} state={{ from: location }} replace />
  );
};

export default RequireAuth;