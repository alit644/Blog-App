import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import BlogPost from "../../components/shared/Card/BlogCard";
import { useCaching } from "../../Hooks/useFetch";
import { NavLink } from "react-router-dom";
import MySkeleton from "../../components/shared/Skeleton/Skeleton";
const LatestArticles = () => {
  // Get latest articles from server

  const { data, isLoading } = useCaching({
    queryKey: ["posts"],
    URL: "posts?_page=1&_limit=4",
    staleTime: 60000,
  });

  if (data == undefined) return <Box height={'70vh'} p={4} fontSize={'2xl'}>No Data...</Box>;
  // Render latest articles

  if (isLoading) return <MySkeleton />;

  const BlogPostList = data.data.map((item) => (
    <BlogPost key={item._id} item={item} />
  ));

  return (
    <Container maxW={"7xl"}>
      <Box pt={4}>
        <HStack justifyContent={"space-between"}>
          <Heading fontSize={{ base: "xl", md: "2xl" }}>
            Latest Articles
          </Heading>
          <Button
            variant={"outline"}
            color="main.100"
            colorScheme="main.200"
            _hover={{ bg: "main.200", color: "white" }}
            as={NavLink}
            to={"/blog"}
          >
            View All
          </Button>
        </HStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent={"center"}
          spacing={4}
          flexWrap={"wrap"}
        >
          {BlogPostList}
        </Stack>
      </Box>
    </Container>
  );
};

export default LatestArticles;
