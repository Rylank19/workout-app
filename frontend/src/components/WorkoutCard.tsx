import { Workout } from '@/store/workout.ts'
import { useUserStore } from '@/store/user.ts';
import { Toaster, toaster } from './ui/toaster.tsx';
import { Button, ButtonGroup, Card, Center, CheckboxGroup, CloseButton, Dialog, Float, IconButton, Image, Link, LinkBox, LinkOverlay, Portal, SimpleGrid, Steps } from '@chakra-ui/react';
import { AiTwotoneDelete } from 'react-icons/ai';
import MiniExerciseCard from './ExerciseMiniCard.tsx';
import { Exercise } from '@/store/exercise.ts';
import { useState } from 'react';

const WorkoutCard = ({workout, exercises} : {workout : Workout, exercises: Exercise[]}) => {
  const selected_exercises = workout.exercises.map(exercise => exercise.exerciseId);
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

  const handleStep = (step_val) => {
    if (step_val < 0)
      setStep(0)
    else if (step_val > 3)
      setStep(3)
    else
      setStep(step_val)
  }

  const [step, setStep] = useState(0)

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
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <LinkOverlay asChild>
            <Link></Link>
          </LinkOverlay>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content minW={"800px"}>
              <Dialog.Header>
                <Dialog.Title>Workout Creation</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <CheckboxGroup defaultValue={selected_exercises}>
                  <SimpleGrid gap={4}>
                    {exercises.map((exercise) => {
                      return <MiniExerciseCard key={exercise._id} exercise={exercise}/>
                    })}
                  </SimpleGrid>
                </CheckboxGroup>
              </Dialog.Body>
              <Dialog.Footer>
                <Button variant="outline" onClick={() => handleStep(step - 1)}>Back</Button>
                {step === 3 && 
                  <Dialog.ActionTrigger asChild>
                    <Button
                      colorPalette="blue"
                      onClick={() => setStep(0)}
                      >Finish</Button>
                  </Dialog.ActionTrigger>
                }
                {step !== 3 && <Button
                  colorPalette="blue"
                  onClick={() => handleStep(step + 1)}
                  >
                  Next
                </Button>}
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
              {/* Add steps down here for workout creation */}
              <Center p={5}>
                <Steps.Root step={step} count={3} >
                  <Steps.List>
                    <Steps.Item index={0} title={"Choose Exercises"}>
                      <Steps.Indicator />
                      <Steps.Title>{"Choose Exercises"}</Steps.Title>
                      <Steps.Separator />
                    </Steps.Item>
                    <Steps.Item index={1} title={"Set Reps and Weights"}>
                      <Steps.Indicator />
                      <Steps.Title>{"Set Reps and Weights"}</Steps.Title>
                      <Steps.Separator />
                    </Steps.Item>
                    <Steps.Item index={2} title={"Review Exercises"}>
                      <Steps.Indicator />
                      <Steps.Title>{"Review Exercises"}</Steps.Title>
                      <Steps.Separator />
                    </Steps.Item>
                  </Steps.List>
                  <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
                </Steps.Root>
              </Center>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Card.Footer>
        <IconButton colorPalette={"red"} onClick={() => handleDeleteWorkout(userID, workout._id)}><AiTwotoneDelete /></IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default WorkoutCard