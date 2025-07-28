import { Button, Container, Flex, VStack, Float } from "@chakra-ui/react"
import {useWorkoutStore, Workout} from '@/store/workout.ts'
import WorkoutCard from "@/components/workouts/WorkoutCard"
import { useExerciseStore } from "@/store/exercise"
import { useUserStore } from "@/store/user"
import { useCallback, useEffect, useState } from "react"
import {dialog} from "@/components/workouts/WorkoutDialog.tsx"
import WorkoutDialogStepContent from "@/components/workouts/WorkoutDialogStepContent"

// TODO: Make sure workout and newWorkout are synched and createWorkout is working

const defaultWorkouts : Workout[] = [
  {
    _id: "123",
    name: "Squat Day",
    exercises: [{
        exerciseId: "681512c13253fc4402ba260e",
        set_data: []
    }]},
  {
    _id: "456",
    name: "Deadlift Day",
    exercises: [{
        exerciseId: "6814f3b78da85a4ddf28312e",
        set_data: []
    }]
  }
]

const WorkoutPage = () => {
  const createWorkout = useWorkoutStore(state => state.createWorkout);
  const fetchExercises = useExerciseStore(state => state.fetchExercises);
  const exercises = useExerciseStore(state => state.exercises);
  const fetchWorkouts = useWorkoutStore(state => state.fetchWorkouts);
  const workouts = useWorkoutStore(state => state.workouts);
  const userID = useUserStore(state => state.userID);

  useEffect(() => {
    fetchExercises(userID);
    fetchWorkouts(userID);
  }, [fetchExercises, fetchWorkouts, userID])
  console.log("exercises", exercises)

  const handleOpenChange = useCallback(async () => {
    dialog.close("c");
  }, [])

  console.log("Page rendered")
  return (
    <Container position={"relative"} h={"85vh"}>
      <Flex h={"full"} direction={"column"} justify={"space-between"} overflow={"scroll"} scrollbar={"hidden"}>
        <VStack>
          {workouts.map(workout => {
            return <WorkoutCard key={workout._id} workout={workout} exercises={exercises} />
          })}
        </VStack>
      </Flex>
      <Float placement={"bottom-center"} offsetY={"10"}>
        <Button
        margin={5}
        onClick={() => {
          dialog.open("c", {
            title: "Workout Creation",
            content: <WorkoutDialogStepContent
            exercises={exercises}/>,
            handleOpenChange: handleOpenChange
          })
          }}>Create New Workout</Button>
      </Float>
      <dialog.Viewport />
    </Container>
  )
}

export default WorkoutPage