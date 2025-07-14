import { Workout } from '@/store/workout'
import { Container, VStack, HStack, Text, For, CheckboxCard, Heading, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const ExerciseCard = ({workout, select, setCount} : {workout : Workout | undefined, select : boolean, setCount : React.Dispatch<React.SetStateAction<number>>}) => {
  if (workout === undefined) {
    return (<Text>Loading...</Text>)
  }

  return (
    <Container w="100vw">
      <VStack gap={4} padding={4}>
        {console.log("ExerciseCard rendered with workout:", workout)}
        <For each={workout.exercises} fallback={<Text>No exercises found</Text>}>
          {(exercise) => (
            <SingleExerciseCard exercise={exercise} select={select} setCount={setCount} />
          )}
        </For>
      </VStack>
    </Container>
  )
}

// TODO: Pull checked state to parent component
const SingleExerciseCard = ({exercise, select, setCount} : {exercise: Workout['exercises'][number], select : boolean, setCount : React.Dispatch<React.SetStateAction<number>>}) => {
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
            <Heading size="lg">{exercise.exerciseId}</Heading>
            <HStack>
              <Text>3</Text>
              <Text>X</Text>
              <Text>10</Text>
              {/* <For each={exercise.set_data}>
              {(set) => (
                <HStack>
                <Text>{set.weight} weight</Text>
                <Text>{set.reps} reps</Text>
                </HStack>
                )}
                </For> */}
            </HStack>
          </Flex>
        </CheckboxCard.Label>
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

export default ExerciseCard