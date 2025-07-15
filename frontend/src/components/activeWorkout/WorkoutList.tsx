import { Workout } from '@/store/workout'
import { Container, VStack, HStack, Text, For, CheckboxCard, Heading, Flex, Center, CloseButton, Box, Button, ActionBar, Portal } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { FaLayerGroup } from "react-icons/fa";
import { Exercise } from '@/store/exercise';


const WorkoutList = ({exercises, workout, setStarted, handleClick} : {
  exercises : Exercise[],
  workout : Workout | undefined,
  setStarted : React.Dispatch<React.SetStateAction<boolean>>,
  handleClick : () => void
}) => {

  // Checks if the select button has been clicked or not
  const [checked, setChecked] = useState(false)
  
  // Keep track of number of exercises selected
  const [count, setCount] = useState(0)
  
  
  if (workout === undefined) {
    return (<Text>Loading...</Text>)
  }
  
  const exerciseIds = workout.exercises.map(exercise => exercise.exerciseId)
  const exerciseNames = exercises.filter(exercise => exerciseIds.includes(exercise._id)).map(exercise => exercise.name)

  return (
    <>
      <Container h={"100vh"} w={"100vw"} justifyContent={"space-between"}>
        <Center>
          <Text fontSize={"3xl"}>{workout.name}</Text>
        </Center>
        <Center>
          <Flex direction={'column'} justify={'flex-start'} maxH={"90vh"}>
            <Box w={"80vw"} justifyContent={"flex-start"} padding={4}>
              <CloseButton variant="solid" onClick={handleClick} />
            </Box>
            <Container>
              <VStack gap={4} padding={4}>
                <For each={exerciseNames} fallback={<Text>No exercises found</Text>}>
                  {(exerciseNames) => (
                    <SingleExerciseCard exercise={exerciseNames} select={checked} setCount={setCount} />
                  )}
                </For>
              </VStack>
            </Container>
          </Flex>
        </Center>
        <Center>
          <Flex justify={"space-between"} w={"20vw"}>
            <Button variant="subtle" colorPalette="green" px={"10"} py={"5"} onClick={() => setChecked(prevCheck => !prevCheck)} >Select</Button>
            <Button colorPalette="green" px={"10"} py={"5"} onClick={() => setStarted(true)}>Start</Button>
          </Flex>
        </Center>
      </Container>
      <ActionBar.Root open={checked} onOpenChange={(e) => setChecked(e.open)} closeOnInteractOutside={false}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {count} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm" onClick={() => console.log("hello")}>
                <FaLayerGroup />
                Group
              </Button>
              <ActionBar.CloseTrigger asChild>
                <CloseButton size="sm" />
              </ActionBar.CloseTrigger>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  )
}

// TODO: Pull checked state to parent component
const SingleExerciseCard = ({exercise, select, setCount} : {exercise: string, select : boolean, setCount : React.Dispatch<React.SetStateAction<number>>}) => {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (select === false) {
      setChecked(false)
      setCount(0)
    }
  }, [select, setCount])

  return (
    <CheckboxCard.Root checked={checked} variant={"subtle"} w={"20vw"} onChange={(e) => {
      console.log(e)
      if (select) {
        if (checked === false) {
          setCount(prevCount => prevCount + 1)
        } else if (checked === true) {
          setCount(prevCount => prevCount - 1)
        }
        setChecked(prevCheck => !prevCheck)
      }
      }}>
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Label>
          <Flex w={"full"} direction={"row"} justify="space-between">
            <Heading size="lg">{exercise}</Heading>
            <HStack>
              <Text>3</Text>
              <Text>x</Text>
              <Text>10</Text>
            </HStack>
          </Flex>
        </CheckboxCard.Label>
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

export default WorkoutList