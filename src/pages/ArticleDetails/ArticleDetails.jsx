import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
} from "@chakra-ui/react";
import { useCaching } from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";
import MySkeleton from "../../components/shared/Skeleton/Skeleton";

export default function ArticleDetails() {
  const { id } = useParams();
  // get one article from server
  const { data, isLoading,isError } = useCaching({
    queryKey: ["one post"],
    URL: `posts/${id}`,
    cacheTime: 60000,
  });

  if (!data || !data.data)
    return (
      <Box h={{ md: "475px" }} p={4} fontSize={"2xl"}>
        No Data
      </Box>
    );
    if (isError) return <Box h={{ md: "475px" }} p={4} fontSize={"2xl"}>
        Something went wrong
      </Box>


  if (isLoading) return <MySkeleton />;


  const { title, excert, image, body, firstName, lastName, createdAt } =
    data.data;

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 8, md: 16 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "390px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {title}
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={"gray.200"} />}
          >
            <Stack spacing={{ base: 4, sm: 6 }}>
              <Text color={"gray.500"} fontSize={"2xl"} fontWeight={"300"}>
                {excert}
              </Text>
              <Text fontSize={"lg"}>
                {firstName} {lastName}
              </Text>
              <Text>{createdAt}</Text>
            </Stack>
            <Box></Box>
          </Stack>
        </Stack>
      </SimpleGrid>
      <Box
        className="body-article"
        mb={8}
        rounded={"lg"}
        border={"1px solid #D2D2D2"}
        p={9}
        dangerouslySetInnerHTML={{ __html: body }}
      ></Box>
    </Container>
  );
}
