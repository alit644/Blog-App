import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { baseUrl } from "../../../Api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const AddCategory = () => {
  const nav = useNavigate('/dashboard/categories')
  // form validation with zod
  const categorySchema = z.object({
    title: z.string().min(1, { message: "First name is required" }),
  });

  // reack hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(categorySchema),
  });

  // post data to server
  const postCategory = async (data) => {
    const res = await axios.post(`${baseUrl}/categories`, data);

    return res.data;
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: postCategory,
    
    onSuccess: () => {
      Swal.fire({
        title: "Added successfully",
        icon: "success",
        position: "top",
        toast: true,
        timer: 1700,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      nav('/dashboard/categories')
      reset()
    },
    
    onError: (error) => {
      console.log(error);
      Swal.fire({
        title: error.message,
        icon: "error",
        position: "top",
        toast: true,
        timer: 1700,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  });

  // form Submit
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <>
      {/* <h1>Add Category</h1> */}
      <Box w={{ base: "full", md: "50%" }}>
        <FormControl my={6}>
          <FormLabel>Category name</FormLabel>
          <Input
            {...register("title")}
            placeholder="name"
            // isInvalid={errors ? true : false}
          />
          <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        </FormControl>
        <Alert mb={4} status="error">
          <AlertIcon />
          Sorry sir, currently you cannot add category
        </Alert>

        <Button
          variant={"contained"}
          bg={"main.100"}
          _hover={{ bg: "main.200" }}
          color={'white'}
          isLoading={isPending}
          loadingText="Submitting"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        {isSuccess && (
          <Alert mt={6} status="success">
            Done ...
          </Alert>
        )}
      </Box>
    </>
  );
};

export default AddCategory;
