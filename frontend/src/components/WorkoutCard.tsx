import { Workout } from '@/store/workout.ts'
import { useUserStore } from '@/store/user.ts';
import { Toaster, toaster } from './ui/toaster.tsx';
import { Button, ButtonGroup, Card, Center, CheckboxGroup, CloseButton, Dialog, Float, IconButton, Image, Link, LinkBox, LinkOverlay, Portal, SimpleGrid, Steps } from '@chakra-ui/react';
import { AiTwotoneDelete } from 'react-icons/ai';
import MiniExerciseCard from './ExerciseMiniCard.tsx';
import { Exercise } from '@/store/exercise.ts';
import { dialog } from '@/components/WorkoutDialog.tsx'
import { useEffect, useRef, useState } from 'react';

const WorkoutCard = ({workout, exercises} : {workout : Workout, exercises: Exercise[]}) => {
  const {userID} = useUserStore();
  const handleDeleteWorkout = async (uid: string, wid : string) => {
    // const {success, message} = await deleteWorkout(uid, eid);
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
  const [step, setStep] = useState(0)

  const incrementStep = () => {
    if (step + 1 > 3)
      setStep(3)
    else
      setStep(step + 1)
  }

  const decrementStep = () => {
    if (step - 1 < 0)
      setStep(0)
    else
      setStep(step - 1)
  }

  const resetStep = () => {
    setStep(0)
  }

  const dialogOpen = useRef(false)
  const [selectedExercises, setSelectedExercises] = useState<string[]>(workout.exercises.map(exercise => exercise.exerciseId));

  // this was my approach to getting the dialog to update when the step state was changed
  useEffect(() => {
    if (dialogOpen.current) {
      console.log(selectedExercises)
      if (step !== 1) {
        dialog.update("a", {
          title: "Workout Creation",
          content: (
            <CheckboxGroup defaultValue={selectedExercises}>
              <SimpleGrid gap={4}>
                {exercises.map((exercise) => {
                  return <MiniExerciseCard key={exercise._id} exercise={exercise}/>
                })}
              </SimpleGrid>
            </CheckboxGroup>
          ),
          step: step,
          incrementStep: incrementStep,
          decrementStep: decrementStep,
          resetStep: resetStep, // I should make an object for the dialog props so that I am not retyping these every time
        })
      }
      else if (step === 1) {
        dialog.update("a", {
          title: "Workout Creation",
          content: (
            <CheckboxGroup value={selectedExercises} onValueChange={setSelectedExercises}>
              <SimpleGrid gap={4}>
                {exercises.map((exercise) => {
                  return <MiniExerciseCard key={exercise._id} exercise={exercise}/>
                })}
              </SimpleGrid>
            </CheckboxGroup>
          ),
          step: step,
          incrementStep: incrementStep,
          decrementStep: decrementStep,
          resetStep: resetStep, // I should make an object for the dialog props so that I am not retyping these every time
        })
      }
    }
  }, [selectedExercises, step, exercises, incrementStep, decrementStep])

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
          dialog.open("a", {
            title: "Workout Creation",
            content: (
              <CheckboxGroup defaultValue={selectedExercises}>
                <SimpleGrid gap={4}>
                  {exercises.map((exercise) => {
                    return <MiniExerciseCard key={exercise._id} exercise={exercise}/>
                  })}
                </SimpleGrid>
              </CheckboxGroup>
            ),
            step: step,
            incrementStep: incrementStep,
            decrementStep: decrementStep,
            resetStep: resetStep,
          })
          dialogOpen.current = true
        }}></Link>
      </LinkOverlay>
      <dialog.Viewport />
      <Card.Footer>
        <IconButton colorPalette={"red"} onClick={() => handleDeleteWorkout(userID, workout._id)}><AiTwotoneDelete /></IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default WorkoutCard