import { useWorkoutStore, Workout } from '@/store/workout.ts'
import { useUserStore } from '@/store/user.ts';
import { Toaster, toaster } from '../ui/toaster.tsx';
import { Card, IconButton, Image, Link, LinkOverlay } from '@chakra-ui/react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { Exercise } from '@/store/exercise.ts';
import { dialog } from '@/components/workouts/WorkoutDialog.tsx'
import WorkoutDialogStepContent from './WorkoutDialogStepContent.tsx';

const WorkoutCard = ({workout, exercises} : {workout : Workout, exercises: Exercise[]}) => {
  const {createWorkout} = useWorkoutStore();
  const {userID} = useUserStore();
  const handleDeleteWorkout = async (uid: string, wid : string) => {
    // const {success, message} = await deleteWorkout(uid, eid);
    console.log(uid, wid);
    const success = true;
    const message = "Hello"
    if (!success) {
      toaster.create({
          title:`Error: ${message}`,
          type: "error",
          action: {
          label: "Close",
          onClick: () => console.log("Closed"),
          }
      });
    }
    else {
      toaster.create({
          title: `Workout Deleted Successfully`,
          type: "success",
          action: {
          label: "Close",
          onClick: () => console.log("Closed"),
        }
      })
    }
  }

  return (
    <Card.Root variant={'elevated'} overflow={"hidden"} key={workout._id} flexDirection={"row"} width={"2xl"}>
      <Toaster />
      <Image height={"200px"} src='https://images.unsplash.com/photo-1685633224688-6a77675eb119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt={workout + " image"}/>
      <Card.Body>
        <Card.Title>{workout.name} Workout</Card.Title>
        <Card.Description>
          Reps: {workout.name} Weights: 100 200 300
        </Card.Description>
      </Card.Body>
      <LinkOverlay asChild>
        <Link onClick={() => {
          console.log("Opening")
          dialog.open("a", {
            title: "Workout Creation",
            content: () => (<WorkoutDialogStepContent 
            exercises={exercises}
            workout={workout}/>),
            handleOpenChange: () => {
              createWorkout(workout)
              dialog.close("a");
            }})}}
      ></Link>
      </LinkOverlay>
      <dialog.Viewport />
      <Card.Footer>
        <IconButton colorPalette={"red"} onClick={() => handleDeleteWorkout(userID, workout._id)}><AiTwotoneDelete /></IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default WorkoutCard