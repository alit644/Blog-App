import { Box, Container, Stack, Text } from "@chakra-ui/react";
import Logo from "../logo/Logo";

export default function Footer() {

  const date = new Date()
  const year = date.getFullYear()

  return (
    <Box bg={"#202020"} color={"gray.200"}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text>© {year} Ali Talib. All rights reserved</Text>
      </Container>
    </Box>
  );
}
