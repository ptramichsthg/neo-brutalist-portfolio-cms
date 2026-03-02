import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from "react-icons/vsc";

interface IWorkCard {
  file: string;
  image: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
}

export default function WorkCard({
  file,
  image,
  title,
  desc,
  cta,
  href,
}: IWorkCard) {
  return (
    <Card.Root>
      <Card.Header>
        <Flex
          justifyContent="space-between"
          bg="bg.subtle"
          p="5"
          alignItems="center"
          borderBottom={"3px solid"}
        >
          <Flex gap="2.5">
            <Box display={{ base: "none", sm: "flex" }} gap="2.5">
              <VscChromeMinimize size="20px" strokeWidth={"1px"} />
              <VscChromeMaximize size="20px" strokeWidth={"1px"} />
            </Box>
            <VscChromeClose size="20px" strokeWidth={"1px"} />
          </Flex>

          <Text fontWeight="bold" fontSize="sm">
            {file}
          </Text>
        </Flex>

        <Image
          src={image}
          alt={title}
          m="5"
          border="3px solid"
          boxShadow="3px 3px 0 black"
        />
      </Card.Header>

      <Card.Body pt={1}>
        <Heading size="md" mb={"4"}>
          {title}
        </Heading>
        <Text fontSize="sm" color="fg.muted">
          {desc}
        </Text>
      </Card.Body>

      <Card.Footer pt={0}>
        <Link href={href} target="_blank" rel="noreferrer" textDecor={"none"}>
          <Button
            gap="2"
            _hover={{
              boxShadow: "4px 4px 0 black",
              "& .arrow-icon": {
                transform: "rotate(-35deg) translateX(2px)",
              },
            }}
          >
            {cta}

            <Box className="arrow-icon" transition="transform 0.2s ease">
              <LuArrowRight />
            </Box>
          </Button>
        </Link>
      </Card.Footer>
    </Card.Root>
  );
}
