import { Badge, Box } from "@chakra-ui/react";
import "./page404.css"
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <Box position={'relative'}>
      <div className="error-pg">
        <div className="error-number">
          <div className="number left-coffee">4</div>
          <div className="coffee-mug" />
          <div className="number right-coffee">4</div>
        </div>
        <div className="sm-screen">404</div>
      </div>
        <Box position={{ base: "relative", md: "absolute"}} top={{ base: "0", md: "40px"}} left={{ base: "0", md: "40%"}} className="mean-msg">
      <Badge fontSize="2xl" colorScheme="red">404</Badge>    Nothing to see here, <Link to="/">go back home!</Link>
        </Box>
    </Box>
  );
};

export default Page404;
