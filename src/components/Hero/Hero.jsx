import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import heroImg from "../../assets/dark.jpg";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
const Hero = () => {
  const cookie = new Cookies();
  const token = cookie.get("userInfo");

  return (
    <Box
      backgroundImage={heroImg}
      backgroundSize={"cover"}
      bgPosition={"left"}
      h="70vh"
      w="100%"
    >
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 10, md: 12 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                color={"white"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Enjoy the
              </Text>
              <br />
              <Text as={"span"} color={"main.100"}>
                Latest Articles
              </Text>
            </Heading>
            <Text color={"#D9D9D9"}>
              Welcome to our blog! We hope you find something that sparks your
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <NavLink to={token ? "/dashboard/add-article" : "/login"}>
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                  colorScheme={"red"}
                  bg={"main.100"}
                  _hover={{ bg: "main.200" }}
                >
                  Add New Article
                </Button>
              </NavLink>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
