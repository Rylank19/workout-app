import { Button, Container, Flex, VStack, Float } from "@chakra-ui/react"
import {useWorkoutStore, Workout} from '@/store/workout.ts'
import WorkoutCard from "@/components/workouts/WorkoutCard"
import { useExerciseStore } from "@/store/exercise"
import { useUserStore } from "@/store/user"
import { useState, useEffect, useCallback } from "react"
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
  const {fetchExercises, exercises} = useExerciseStore();
  const {userID} = useUserStore();
  const {fetchWorkouts, createWorkout, workouts} = useWorkoutStore();

  const [newWorkout, setNewWorkout] = useState<Workout>({
    name: "",
    exercises: [],
  }); // some state for saving what users type in the form

  useEffect(() => {
    fetchExercises(userID);
    fetchWorkouts(userID);
  }, [fetchExercises, fetchWorkouts, userID])
  console.log("exercises", exercises)

  const handleOpenChange = () => {
    dialog.close("c")
    createWorkout(newWorkout);
  }

  return (
    <Container gap={4} position={"relative"} h={"85vh"}>
      <Flex direction={"column"} justify={"space-between"}>
        <VStack>
          {defaultWorkouts.map(workout => {
            return <WorkoutCard key={workout._id} workout={workout} setNewWorkout={setNewWorkout} exercises={exercises} />
          })}
        </VStack>
      </Flex>
      <Float placement={"bottom-center"} offsetY={"10"}>
        <Button
        margin={5}
        onClick={() => {
          dialog.open("c", {
            title: "Workout Creation",
            content: () => (<WorkoutDialogStepContent
            exercises={exercises}
            workout={newWorkout}
            setNewWorkout={setNewWorkout}/>),
            handleOpenChange: handleOpenChange
          })
          }}>Create New Workout</Button>
      </Float>
    </Container>
  )
}

export default WorkoutPage