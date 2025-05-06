import { Workout } from '@/store/workout.ts'
import { useUserStore } from '@/store/user.ts';
import { Toaster, toaster } from './ui/toaster.tsx';
import { Card, CheckboxGroup, IconButton, Image, Link, LinkOverlay, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { AiTwotoneDelete } from 'react-icons/ai';
import MiniExerciseCard from './ExerciseMiniCard.tsx';
import { Exercise } from '@/store/exercise.ts';
import { dialog } from '@/components/WorkoutDialog.tsx'
import { useCallback, useEffect, useRef, useState } from 'react';
import RepCard from '@/components/RepCard.tsx';

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

  const dialogOpen = useRef(false)
  const selectedExercises = useRef<string[]>(workout.exercises.map(exercise => exercise.exerciseId));

  // state for order of selecting exercises
  interface numberEntries {
    id: string;
    value: number
  }

  const [exerciseStates, setExerciseStates] = useState<numberEntries[]>([]);
  const [nextNumber, setNextNumber] = useState(1);

  const handleToggle = useCallback((id: string) => {
    setExerciseStates(prev => [...prev, {id: id, value: 3}])
  }, [exerciseStates]);

  // this was my approach to getting the dialog to update when the step state was changed
  useEffect(() => {
    const getExercisesFromIds = (exerciseIds : string[]) => {
      const exercises_found = exerciseIds.map(id => exercises.find(x=> x._id === id));
  
      if (!exercises_found) return {};
      return exercises_found;
    }

    if (dialogOpen.current) {
      if (step !== 1 && step !== 0) {
        dialog.update("a", {
          content: (
            <Text>Step {step}</Text>
          ),
          step: step,
        })
      } else if (step === 0) {
        dialog.update("a", {
          content: (
            <CheckboxGroup defaultValue={selectedExercises.current} onValueChange={(value) => selectedExercises.current = value}>
              <SimpleGrid gap={4}>
                {exercises.map((exercise, index) => {
                  return <MiniExerciseCard key={exercise._id} exercise={exercise} number={exerciseStates.find(value => value.id === exercise._id)?.value ?? -1} onToggle={() => handleToggle(exercise._id)}/>
                })}
              </SimpleGrid>
            </CheckboxGroup>
          ),
          step: step,
        })
      }
      else if (step === 1) {
        dialog.update("a", {
          content: (
            <VStack gap={4}>
              {getExercisesFromIds(selectedExercises.current).map((exercise, index) => {
                return <RepCard exercise={exercise} index={index} />
              })}
            </VStack>
          ),
          step: step
        })
      }
    }
  }, [step, exercises, exerciseStates, handleToggle])

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
              <CheckboxGroup defaultValue={selectedExercises.current} onValueChange={(value) => selectedExercises.current = value}>
                <SimpleGrid gap={4}>
                  {exercises.map((exercise, index) => {
                    return <MiniExerciseCard key={exercise._id} exercise={exercise} number={exerciseStates.find(value => value.id === exercise._id)?.value ?? -1} onToggle={() => handleToggle(exercise._id)} />
                  })}
                </SimpleGrid>
              </CheckboxGroup>
            ),
            step: step,
            setter: setStep,
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