import ExerciseReviewCard from '@/components/exercises/ExerciseReviewCard'
import { Exercise } from '@/store/exercise'
import { Workout } from '@/store/workout'
import { VStack } from '@chakra-ui/react'
import React from 'react'

interface Props {
  exercises: Exercise[]
  workoutData: Workout
}

const ReviewWorkout : React.FC<Props> = ({exercises, workoutData}) => {
  return (
    <VStack gap={4}>
      {workoutData.exercises.map(exercise => {
        return <ExerciseReviewCard setsData={exercise.setData} exercise={exercises.find(e => e._id === exercise.exerciseId)} />
      })}
    </VStack>
  )
}

export default ReviewWorkout