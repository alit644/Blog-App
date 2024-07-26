import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Inputt from "../../Form/Input/Input";
import { postArticleSchema } from "./postArticleSchema";
import { useCaching } from "../../../Hooks/useFetch";
import axios from "axios";
import { baseUrl } from "../../../Api";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ReactQuill from "react-quill";
import { useUser } from "../../../context/UserContext";
import { formatDate } from "../../../constant/dateForman";

// مساحة تحرير المقال
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    [{ "code-block": true }],
    ["clean"],
    // إضافة زر "مسح"
  ],
};
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "indent",
  "link",
];
const AddArticle = () => {
  // get currnet user
  const { user } = useUser();
  const nav = useNavigate();
  // form validation with zod
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(postArticleSchema),
  });

  //! get all Categories
  const { data, isLoading } = useCaching({
    queryKey: ["categories"],
    URL: "categories",
    staleTime: 60000,
  });

  // post data to server
  const postArticle = async (data) => {
    const res = await axios.post(`${baseUrl}/posts`, data);
    return res.data;
  };

  //! Mutation query
  const { mutate, isPending } = useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      Swal.fire({
        title: "The article has been added successfully",
        icon: "success",
        position: "top",
        toast: true,
        timer: 1800,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      nav("/");
    },
    onError: (error) => {
      console.log(error.message);
      Swal.fire({
        title: error.message,
        icon: "error",
        position: "top",
        toast: true,
        timer: 2300,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    },
  });

  // form Submit
  const onSubmit = (data) => {
    const currentDate = formatDate(new Date());

    // send data and user FullName
    const dataToSend = {
      ...data,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: currentDate,
    };
    mutate(dataToSend);
    reset();
  };

  // show categories list (Options)
  const optionCat = data?.data?.map((item) => (
    <option key={item.id} value={item.id}>
      {item.title}
    </option>
  ));

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Helmet>
        <title>Add Article</title>
      </Helmet>
      <Box>
        <Heading size="lg">Add new article</Heading>
        <Stack mt={"6"} w={{ base: "100%", md: "540px" }}>
          <FormControl>
            <FormLabel>Categories Name</FormLabel>
            <Select {...register("categoryId")} placeholder="Select country">
              {optionCat}
            </Select>
            <FormHelperText color={"red.500"}>
              {errors?.selectedOption?.message}
            </FormHelperText>
          </FormControl>
          <Inputt
            name={"title"}
            label={"Article Title"}
            register={register}
            errors={errors?.title?.message}
          />
          <Inputt
            name={"excert"}
            label={"Article Excert"}
            register={register}
            errors={errors?.excert?.message}
          />
          <Inputt
            name={"image"}
            label={"Article Image"}
            register={register}
            errors={errors?.image?.message}
          />
          {/* Body Controller  */}
          <FormControl>
            <FormLabel>Article Body</FormLabel>
            <Controller
              name="body"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  placeholder="Enter article body"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FormHelperText color={"red.500"}>
              {errors?.body?.message}
            </FormHelperText>
          </FormControl>

          {/* Button for adding article */}
          <Button
            variant={"contained"}
            bg={"main.100"}
            color={"white"}
            _hover={{ bg: "main.200" }}
            onClick={handleSubmit(onSubmit)}
            isLoading={isPending}
            loadingText="Adding..."
          >
            Add Article
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddArticle;
