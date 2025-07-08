import { Workout } from '@/store/workout'
import { Container, VStack, HStack, Text, For, Card, Heading } from '@chakra-ui/react'
import React from 'react'

const ExerciseCard = ({workout} : {workout : Workout | undefined}) => {
  if (workout === undefined) {
    return (<Text>Loading...</Text>)
  }

  return (
    <Container h={"100vh"} w={"100vw"}>
      <VStack h={"100%"} w={"100%"} gap={4} padding={4}>
        {console.log("ExerciseCard rendered with workout:", workout)}
        <For each={workout.exercises} fallback={<Text>No exercises found</Text>}>
          {(exercise) => (
            <SingleExerciseCard exercise={exercise} />
          )}
        </For>
      </VStack>
    </Container>
  )
}

const SingleExerciseCard = ({exercise} : {exercise: Workout['exercises'][number]}) => {
  return (
    <Card.Root size="md">
      <Card.Header>
        <Heading size="lg">{exercise.exerciseId}</Heading>
      </Card.Header>
      <Card.Body color="fg.muted">
        <HStack w={"full"}>
          <For each={exercise.set_data}>
          {(set) => (
            <HStack>
              <Text>{set.weight} weight</Text>
              <Text>{set.reps} reps</Text>
            </HStack>
          )}
          </For>
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}

export default ExerciseCard