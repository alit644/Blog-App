import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCaching } from "../../../Hooks/useFetch";
import { CiEdit } from "react-icons/ci";
import MyModal from "../../shared/Modal/Modall";
import { useState } from "react";
import { Helmet } from "react-helmet";

const Category = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // category id
  const [cateId, setCateId] = useState(null);
  // get all categories
  const { data, isLoading, isError } = useCaching({
    queryKey: ["categories"],
    URL: `categories`,
    cacheTime: 60000,
  });

  // handel edit

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }

  // show categories list
  const categories = data?.data?.map((item) => (
    <Box
      minW={{ base: "48%", md: "200px" }}
      // onClick={onOpen}
      bg="white"
      p={5}
      rounded={"lg"}
      cursor={"pointer"}
      _hover={{ border: " 1px solid #E2E8F0" }}
      transition={"0.3s"}
      key={item.id}
      id={item.id}
    >
      <HStack justifyContent={"space-between"} alignItems={"center"}>
        <Text>{item.title}</Text>
        <CiEdit
          onClick={() => {
            setCateId(item.id);
            onOpen();
          }}
          color="blue"
          size={20}
        />
      </HStack>
    </Box>
  ));

  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <Heading mb={6}>Category page</Heading>
      <Stack direction={"row"} flexWrap={"wrap"}>
        {categories}
      </Stack>
      <MyModal isOpen={isOpen} cateId={cateId} onClose={onClose} />
    </>
  );
};

export default Category;
