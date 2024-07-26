/* eslint-disable react/prop-types */
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function BlogCard({
  item: { title, image, excert, id, firstName, lastName, createdAt },
}) {
  return (
    <Center py={6}>
      <Box
        as={NavLink}
        to={`/blog-details/${id}`}
        id={id}
        position={"relative"}
        maxW={"320px"}
        w={"290px"}
        h={{ md: "480px" }}
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image w={"100%"} maxH={"100%"} src={image} fill alt="Example" />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
          >
            Blog
          </Text>
          <Heading
            // eslint-disable-next-line react-hooks/rules-of-hooks
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text display={{ base: "none", md: "block" }} color={"gray.500"}>
            {excert}
          </Text>
        </Stack>
        <Stack
          w={"100%"}
          bg={"rgba(0, 0, 0, 0.527)"}
          position={"absolute"}
          top={"168"}
          left={0}
          direction={"row"}
          spacing={4}
        >
          <Stack
            color={"white"}
            pl={4}
            direction={"column"}
            spacing={0}
            fontSize={"sm"}
          >
            <Text fontWeight={600}>
              {firstName} {lastName}
            </Text>
            <Text>{createdAt}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
