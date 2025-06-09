import { Exercise } from '@/store/exercise';
import { Workout } from '@/store/workout';
import { Text, Button, Center, CloseButton, Dialog, Steps} from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import { useWorkoutStore } from '@/store/workout';
import { dialog } from './WorkoutDialog';
import ExerciseSelection from './dialog_steps/ExerciseSelection';
import SelectRepsAndOrder from './dialog_steps/SelectRepsAndOrder';
import ReviewWorkout from './dialog_steps/ReviewWorkout';

const WorkoutDialogStepContent = ({ exercises, workout, setNewWorkout }: {
  exercises: Exercise[];
  workout: Workout;
  setNewWorkout: React.Dispatch<React.SetStateAction<Workout>>;
}) => {
  const [step, setStep] = useState(0)
  const {createWorkout} = useWorkoutStore();
  const [workoutData, setWorkoutData] = useState<Workout>(workout);

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
  
  const storeAndReset = () => {
    createWorkout(workoutData);
    dialog.close("a")
  }

  useEffect(() => {
    console.log("WorkoutDialogStepContent mounted");
    return () => console.log("WorkoutDialogStepContent unmounted");
  }, []);

  interface NumberEntries {
    id: string;
    value: number
  }

  // at this point, exercises states is populated with selectedExercises (need for steps 1 and 2)
  const [exerciseNumbering, setExerciseNumbering] = useState<NumberEntries[]>(() => {
    const startingExercises = workoutData.exercises.map(exercise => exercise.exerciseId)
    const startingStates = new Array(startingExercises.length)
    for (let i = 0; i < startingExercises.length; i++) {
      startingStates[i] = {id: startingExercises[i], value: (i + 1)}
    }
    return startingStates;
  });
  
  return (
    <>
      <Dialog.Body>
        {/* <WorkoutSubComponent workoutData={workoutData} setWorkoutData={setWorkoutData} step={step} exercises={exercises} /> */}
        {step === 0 && <ExerciseSelection exercises={exercises} exerciseNumbering={exerciseNumbering} setExerciseNumbering={setExerciseNumbering} workoutData={workoutData} setWorkoutData={setWorkoutData} />}
        {step === 1 && <SelectRepsAndOrder exercises={exercises} exerciseNumbering={exerciseNumbering} setExerciseNumbering={setExerciseNumbering} workoutData={workoutData} setWorkoutData={setWorkoutData} />}
        {step === 2 && <ReviewWorkout exercises={exercises} workoutData={workoutData} />}
      </Dialog.Body>
      <Dialog.Footer>
        <Button variant="outline" onClick={decrementStep}>Back</Button>
        {step === 2 && 
          <Dialog.ActionTrigger asChild>
            <Button
              colorPalette="blue"
              onClick={storeAndReset}
              >Finish</Button>
          </Dialog.ActionTrigger>
        }
        {step !== 2 && <Button
          colorPalette="blue"
          onClick={incrementStep}
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
          <Steps.CompletedContent>Complete your workout!</Steps.CompletedContent>
        </Steps.Root>
      </Center>
    </>
  )
}

export default WorkoutDialogStepContent