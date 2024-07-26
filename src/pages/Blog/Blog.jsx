import { Box, Container, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import BlogPost from "../../components/shared/Card/BlogCard";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MySkeleton from "../../components/shared/Skeleton/Skeleton";
import { baseUrl } from "../../Api";
import axios from "axios";

const Blog = () => {
  // get category id
  const [cateId, setCateId] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["posts", cateId],
    queryFn: () => {
      return axios.get(
        `${baseUrl}/${cateId === 0 ? "posts" : `posts?categoryId=${cateId}`}`
      );
    },
    staleTime: 60000,
    // cacheTime: 300000,
  });

  const { data: dataCat } = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return axios.get(`${baseUrl}/categories?_page=1&_limit=4`);
    },
    staleTime: 60000,
    // cacheTime: 300000,
  });

  if (isLoading) return <MySkeleton />;
  if (dataCat === undefined) return null;

  if (data === undefined) return <Box h={{ md: "475px" }} p={4} fontSize={'2xl'}>No data ...</Box>;

  //! Fetch products of a specific category when a category button is clicked
  const handleCategoryChange = (id) => {
    setCateId(id);
    queryClient.invalidateQueries(["posts", id], { exact: true });
  };

  // Render category buttons ( Tabs )
  const showCat = dataCat.data.map((item) => (
    <Tab
      _selected={{ color: "white", bg: "main.100" }}
      key={item._id}
      px={{ base: 1.5, md: 4 }}
      onClick={() => handleCategoryChange(item.id)}
    >
      {item.title}
    </Tab>
  ));

  const BlogPostList = data.data.map((item) => (
    <BlogPost key={item.id} item={item} />
  ));

  return (
    <Container maxW={"7xl"}>
      <Box my={6}>
        <Tabs w={{ base: "100%", md: "70%" }}>
          <TabList>
            <Tab
              _selected={{ color: "white", bg: "main.200" }}
              onClick={() => handleCategoryChange(0)}
            >
              All
            </Tab>
            {showCat}
          </TabList>
        </Tabs>

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

export default Blog;
