import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const usePostUser = ({ mutFn, reset, updateUser, cookies }) => {
  return useMutation({
    mutationFn: mutFn,
    onSuccess: (data) => {
      const { accessToken, user } = data;
      updateUser(user);
      cookies.set("userInfo", { accessToken }, { path: "/" });
      reset();
      Swal.fire({
        title: "Account has been successfully registered",
        icon: "success",
        position: "top",
        toast: true,
        timer: 1700,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      setTimeout(() => {
        window.location.pathname = "/";
      }, 1800);
    },
    onError: (error) => {
      console.log(error.response.data);
      Swal.fire({
        title: error.response.data,
        icon: "error",
        position: "top",
        toast: true,
        timer: 2200,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  });
};


