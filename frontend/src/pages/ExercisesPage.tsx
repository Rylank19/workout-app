import ExerciseCard from '@/components/ExerciseCard'
import {Container, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

const ExercisesPage = () => {
  const exercises = ["Deadlift", "Bicep Curl", "Squat", "Handstand", "Rows", "Levers", "Running"]

  return (
    <Container maxW={"100vw"}>
      <SimpleGrid minChildWidth="md" gap={"20px"} w={"full"}>
        {exercises.map(exercise => {
          return <ExerciseCard exercise={exercise}/>
        })}
      </SimpleGrid>
    </Container>
  )
}

export default ExercisesPage