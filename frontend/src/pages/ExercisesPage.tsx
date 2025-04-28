import ExerciseCard from '@/components/ExerciseCard'
import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import React from 'react'

const ExercisesPage = () => {
  const exercises = ["Deadlift", "Bicep Curl", "Squat", "Handstand", "Rows", "Levers", "Running"]

  return (
    <Box maxW={"container.lg"}>
      <SimpleGrid minChildWidth="md" gap={"40px"} w={"full"}>
        {exercises.map(exercise => {
          return <ExerciseCard exercise={exercise}/>
        })}
      </SimpleGrid>
    </Box>
  )
}

export default ExercisesPage