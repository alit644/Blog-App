import Cookies from "universal-cookie";

// handel logout
export const handelLogout = () => {
  const cookie = new Cookies();
  cookie.remove("userInfo");
  localStorage.removeItem("user");
  window.location.pathname = "/";
};
