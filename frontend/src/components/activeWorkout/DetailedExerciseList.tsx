import React, { useState } from 'react'
import { NumberInput, Card, HStack, Text, For, Container, Flex, VStack, Separator, CloseButton, Box, Button, Center } from '@chakra-ui/react'
import { toaster } from "@/components/ui/toaster"
import { FaLayerGroup } from 'react-icons/fa6'
import { Workout } from '@/store/workout'
import { Exercise } from '@/store/exercise'
import ExercisesPage from '@/pages/ExercisesPage'

interface WorkoutExerciseData {
  exerciseId: string,
  set_data: {
      reps: number,
      weight: number,
  }[]
}

const DetailedExerciseList = ({exercises, workout, handleClick} : {exercises : Exercise[], workout : Workout | undefined, handleClick : () => void}) => {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [workoutSets, setWorkoutSets] = useState<WorkoutExerciseData[]>()

  if (workout === undefined) return <Text>No workout loaded...</Text>

  const exerciseIds = workout.exercises.map(exercise => exercise.exerciseId)
  const exerciseNames = exercises.filter(exercise => exerciseIds.includes(exercise._id)).map(exercise => exercise.name)


  const completeWorkout = () => {
    toaster.create({
      description: "Workout Finished",
      type: "info"
    })
    handleClick()
  }

  const moveForward = () => {
    if (currentExercise < exerciseNames.length - 1) {
      setCurrentExercise(prevExercise => prevExercise + 1)
      return true
    }
    return false
  }

  const moveBackward = () => {
    if (currentExercise > 0)
      setCurrentExercise(prevExercise => prevExercise - 1)
  }

  const logExercise = () => {
    if (moveForward())
      toaster.create({
        description: "Set Completed",
        type: "success"
      })
  }

  return (
    <>
      <Container h={"100vh"} w={"100vw"} justifyContent={"space-between"}>
        <Center>
          <Text fontSize={"3xl"}>{exerciseNames[currentExercise]}</Text>
        </Center>
        <Center>
          <Flex direction={'column'} justify={'flex-start'} maxH={"90vh"}>
            <Container h={"90vh"}>
              <Flex justify={"space-between"}>
                <CloseButton variant="solid" marginBottom={"4"} onClick={handleClick} />
                <Button variant="solid" colorPalette={"green"} marginBottom={"4"} onClick={completeWorkout}>Finish</Button>
              </Flex>
              <VStack>
                <For each={["Set1", "Set2", "Set3"]}>
                  {(item) => (<SingleExercise name={item} />)}
                </For>
              </VStack>
            </Container>
          </Flex>
        </Center>
        <Center>
          <Flex justify={"space-between"} w={"30vw"}>
            <Button colorPalette="green" py={"5"} onClick={() => moveBackward()}>&lt;</Button>
            <Button colorPalette="green" px={"10"} py={"5"} onClick={() => logExercise()}>Log</Button>
            <Button colorPalette="green" py={"5"} onClick={() => moveForward()}>&gt;</Button>
          </Flex>
        </Center>
      </Container>
    </>
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

export default DetailedExerciseList