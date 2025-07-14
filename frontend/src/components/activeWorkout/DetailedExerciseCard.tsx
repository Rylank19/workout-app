import React from 'react'
import { NumberInput, Card, HStack, Text, For, Container, Flex, VStack, Separator } from '@chakra-ui/react'

const DetailedExerciseCard = () => {
  return (
    <Container h={"90vh"}>
      <VStack>
        <For each={["Set1", "Set2", "Set3"]}>
          {(item) => (<SingleExercise name={item} />)}
        </For>
      </VStack>
    </Container>
  )
}

const SingleExercise = ({name} : {name : string}) => {
  return (
    <>
      <Card.Root>
        <Card.Body>
          <Flex gap={"4"}>
            <HStack flexGrow={1} gapX={"10"}>
              <Text fontSize={"md"}>Reps</Text>
              <NumberInput.Root size={"md"}>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </HStack>
            <Separator orientation={"vertical"} />
            <HStack flexGrow={1} gap={"10"}>
              <Text fontSize={"md"}>Weight</Text>
              <NumberInput.Root size={"md"}>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </HStack>
          </Flex>
        </Card.Body>
      </Card.Root>
    </>
  )
}

export default DetailedExerciseCard