import { Container, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { WORKS } from "./const";
import WorkCard from "./work-card";

export default function Works() {
  /* Removed date sorting to preserve manual order */
  const sortedWorks = WORKS;

  return (
    <Container py="10" id="works" maxW={'6xl'}>
      <VStack>
        <Heading fontWeight={"bold"} fontSize="2xl">
          Selected Works
        </Heading>
        <Text color="fg.muted" maxW="lg" textAlign="center" mb={"8"}>
          Selected work, built with purpose.
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap="6"
          justifyItems="stretch"
        >
          {sortedWorks.map((work, idx) => (
            <WorkCard key={idx} {...work} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
