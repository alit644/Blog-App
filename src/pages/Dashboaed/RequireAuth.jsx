import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAuth = () => {
  const cookie = new Cookies();
  const token = cookie.get("userInfo");
  return !token ? <Navigate to="/login" /> : <Outlet />;
};

export default RequireAuth;
