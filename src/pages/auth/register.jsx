import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { singUpSchema } from "../../validations/singUpSchema";
import Inputt from "../../components/Form/Input/Input";
import axios from "axios";
import Cookies from "universal-cookie";
import { baseUrl } from "../../Api";
import { useUser } from "../../context/UserContext";
import { usePostUser } from "./usePostUser";

export default function Signup() {
  const cookies = new Cookies();
  // state user
  const { updateUser } = useUser();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // التحقق قبل الارسال
    mode: "onBlur",
    resolver: zodResolver(singUpSchema),
  });

  // add user
  const addUser = async (data) => {
    const res = await axios.post(`${baseUrl}/register`, data);
    return res.data;
  };

  // useMutation
  const { mutate, isPending } = usePostUser({
    mutFn: addUser,
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <Inputt
                  label={"First Name"}
                  name={"firstName"}
                  register={register}
                  type="text"
                  errors={errors.firstName?.message}
                />
              </Box>
              <Box>
                <Inputt
                  label={"Last Name"}
                  name={"lastName"}
                  register={register}
                  type="text"
                  errors={errors.lastName?.message}
                />
              </Box>
            </HStack>
            <Inputt
              label={"Email Adress"}
              name={"email"}
              register={register}
              type="email"
              errors={errors.email?.message}
            />
            <Inputt
              label={"Password"}
              name={"password"}
              register={register}
              type="password"
              errors={errors.password?.message}
            />

            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit(onSubmit)}
                isLoading={isPending}
                loadingText="Submitting"
                size="lg"
                bg={"main.100"}
                color={"white"}
                _hover={{
                  bg: "main.200",
                }}
                disabled={true}
              >
                Sign up
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <NavLink to={"/login"}>Login</NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
