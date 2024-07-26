import { Skeleton } from "@chakra-ui/react";

const MySkeleton = () => {
  return (
    <Skeleton
      m={4}
      maxW={"320px"}
      w={"290px"}
      h={{ md: "480px" }}
      isLoaded={false}
      mt={7}
    ></Skeleton>
  );
};

export default MySkeleton;
