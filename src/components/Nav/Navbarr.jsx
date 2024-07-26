/* eslint-disable react/prop-types */
"use client";

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";

import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosClose } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import { handelLogout } from "../../constant/handelLogout";
import Logo from "../logo/Logo";

const navItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Blog",
    path: "/blog",
  },
];

const MobileNav = ({ onClose, ...rest }) => {
  const showNavItem = navItem.map((item) => (
    <NavLink key={item.name} to={item.path}>
      <Button
        bg={"gray.100"}
        w={"90%"}
        color={"black"}
        onClick={onClose}
        _hover={{ bg: "gray.200", color: "black" }}
        mx={2}
      >
        {item.name}
      </Button>
    </NavLink>
  ));

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="fit-content"
      bg={useColorModeValue("white", "gray.900")}
      {...rest}
    >
      <Stack my={4} w={"100%"} direction={"column"}>
        {showNavItem}
      </Stack>
    </Flex>
  );
};

export default function Navbarr() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const cookie = new Cookies();
  // show Item list
  const showNavItem = navItem.map((item) => (
    <NavLink key={item.name} to={item.path}>
      <Button
        bg={"transparent"}
        color={"white"}
        _hover={{ bg: "gray.200", color: "black" }}
        mx={2}
      >
        {item.name}
      </Button>
    </NavLink>
  ));

  return (
    <Box>
      <Flex
        border={"none"}
        bg={useColorModeValue("#202020", "gray.800")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            bg={"transparent"}
            icon={
              isOpen ? (
                <IoIosClose color="white" w={3} h={3} />
              ) : (
                <RxHamburgerMenu color="white" w={5} h={5} />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
          >
            <Logo />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            {showNavItem}
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {cookie.get("userInfo") !== undefined ? (
            <Button
              as={NavLink}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              borderColor={"main.100"}
              color={"main.100"}
              _hover={{
                bg: "main.200",
                color: "white",
              }}
              variant={"outline"}
              onClick={handelLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                as={NavLink}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                to={"/login"}
              >
                Login
              </Button>
              <Button
                as={NavLink}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"main.100"}
                to={"/register"}
                _hover={{
                  bg: "main.200",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onClose={onClose} />
      </Collapse>
    </Box>
  );
}
