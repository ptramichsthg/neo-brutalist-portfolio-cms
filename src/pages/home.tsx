import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { ImageHero } from "../assets/images";
import { getGenericChatLink } from "../utils";

export default function Home() {
  return (
    <Container
      py={"10"}
      maxW={"6xl"}
      minH={"70svh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      id="home"
    >
      <Flex
        w={"full"}
        flexDir={{ base: "column-reverse", md: "row" }}
        justifyContent={"space-between"}
        gap={{ base: "5", md: "9" }}
        alignItems={"center"}
      >
        <Box flex={1} mt={{ base: "5", md: "0" }}>
          <Heading fontWeight={"bold"} fontSize={"2xl"}>
            Hello!
          </Heading>
          <Heading fontWeight={"bold"} fontSize={"2xl"} mb={"3"}>
            I'm, Putra Michael Sitohang.
          </Heading>
          <Text mb={"5"} maxW={"lg"}>
            I design and build sharp web products. Frontend systems, UI
            architecture, and real-world execution.
          </Text>
          <Link
            href={getGenericChatLink()}
            target="_blank"
            rel="noopener noreferrer"
            textDecor={"none"}
          >
            <Button>Let's Chat!</Button>
          </Link>
        </Box>
        <Box flex={1}>
          <Image
            src={ImageHero}
            alt="Green double couch with wooden legs"
            justifySelf={"end"}
            maxW={{ sm: "xs", lg: "sm" }}
            border={"3px solid"}
            boxShadow={"3px 3px 0 black"}
          />
        </Box>
      </Flex>
    </Container>
  );
}
