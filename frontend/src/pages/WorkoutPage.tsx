import { Container, VStack } from "@chakra-ui/react"
import {Workout} from '@/store/workout.ts'
import WorkoutCard from "@/components/WorkoutCard"
import { useExerciseStore } from "@/store/exercise"
import { useUserStore } from "@/store/user"
import { useState, useEffect } from "react"

const workouts : Workout[] = [
  {
    _id: "123",
    name: "Squat Day",
    exercises: [{
        exerciseId: "681512c13253fc4402ba260e",
        setData: [{
            reps: 8,
            weight: 100,
        }]
    }]},
  {
    _id: "456",
    name: "Deadlift Day",
    exercises: [{
        exerciseId: "6814f3b78da85a4ddf28312e",
        setData: [{
            reps: 9,
            weight: 200,
        }]
    }]
  }
]

const WorkoutPage = () => {
  const {fetchExercises, exercises} = useExerciseStore();
  const {userID} = useUserStore();

  useEffect(() => {
    fetchExercises(userID);
  }, [fetchExercises, userID])
  console.log("exercises", exercises)

  return (
    <Container maxW={"100vw"} gap={4}>
      <VStack>
        {workouts.map(workout => {
          return <WorkoutCard key={workout._id} workout={workout} exercises={exercises} />
        })}
      </VStack>
    </Container>
  )
}

export default WorkoutPage