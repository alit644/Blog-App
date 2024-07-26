import { zodResolver } from "@hookform/resolvers/zod";
import { singInSchema } from "../../validations/singInSchema";

import {
  Flex,
  Box,
  Stack,
  Button,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Inputt from "../../components/Form/Input/Input";
import axios from "axios";
import { baseUrl } from "../../Api";
import { useUser } from "../../context/UserContext";
import Cookies from "universal-cookie";
import { usePostUser } from "./usePostUser";

export default function Login() {
  const cookies = new Cookies();
  // state user
  const { updateUser } = useUser();
  //! react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(singInSchema),
  });

  // Login user func
  const loginUser = async (data) => {
    const res = await axios.post(`${baseUrl}/login`, data);
    return res.data;
  };

  // useMutation
  const { mutate, isPending } = usePostUser({
    mutFn: loginUser,
    reset,
    updateUser,
    cookies,
  });

  // submit form
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w={"50%"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Inputt
              label={"Email address"}
              name={"email"}
              type="email"
              register={register}
              errors={errors?.email?.message}
            />
            <Inputt
              label={"Password"}
              name={"password"}
              type="password"
              register={register}
              errors={errors?.password?.message}
            />

            <Stack spacing={10}>
              <Button
                bg={"main.100"}
                color={"white"}
                _hover={{
                  bg: "main.200",
                }}
                onClick={handleSubmit(onSubmit)}
                isLoading={isPending}
                loadingText="Submitting"

              >
                Sign in
              </Button>
            </Stack>
          
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              
              <Text
                as={Link}
                to={"/register"}
                textDecoration={"underline"}
                color={"blue.400"}
              >
                You dont have an account
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
