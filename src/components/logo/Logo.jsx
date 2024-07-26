import { Box, Image } from "@chakra-ui/react";
import logoURL from "../../assets/logo-2.svg"
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <Box as={NavLink} to={'/'} >
      <Image cursor={'pointer'} src={`${logoURL}`} alt="logo" width={'40px'} />
    </Box>
  );
}

export default Logo;
