import { Exercise } from '@/store/exercise';
import { Workout } from '@/store/workout';
import { CheckboxGroup, SimpleGrid, VStack, Text, Button, Center, CloseButton, Dialog, Steps} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import MiniExerciseCard from '../exercises/ExerciseMiniCard';
import RepCard from '../RepCard';
import { MdUpdateDisabled } from 'react-icons/md';
import ExerciseReviewCard from '../exercises/ExerciseReviewCard';

const WorkoutSubComponent = ({ step, exercises, selectedExercises, numbers, workout }: {
  step: number;
  exercises: Exercise[];
  selectedExercises: React.RefObject<string[]>;
  numbers: React.RefObject<number[]>;
  workout: Workout;
}) => {
  // state for order of selecting exercises
  interface numberEntries {
    id: string;
    value: number
  }

  const [workoutData, setWorkoutData] = useState<Workout>(workout);

  const [exerciseStates, setExerciseStates] = useState<numberEntries[]>(() => {
    const startingStates = new Array(selectedExercises.current.length)
    for (let i = 0; i < selectedExercises.current.length; i++) {
      startingStates[i] = {id: selectedExercises.current[i], value: (i + 1)}
    }
    return startingStates;
  });
  const nextNumberRef = useRef(selectedExercises.current.length + 1);
  // state for step 1
  const [currentElement, setCurrentElement] = useState<number>(-1); // -1 indicates no element selected

  const handleValueChange = (selected: string[]) => {
    const currentSet = new Set(selected);      

    if (selected.length < selectedExercises.current.length) {// element was removed
      const difference_array = selectedExercises.current.filter(x => !selected.includes(x)); // get the element that is different
      console.log(selected)
      console.log(selectedExercises.current)

      let difference = "";
      if (difference_array.length != 1)
        console.log("Why did this happen?")
      else
        difference = difference_array[0];

      // get the number associated with the element removed
      const num_removed = exerciseStates.find(e => e.id === difference)!.value

      nextNumberRef.current--;
      if (num_removed != nextNumberRef.current) { // we gotta change the numbers so there are no gaps
        exerciseStates.forEach(e => {
          if (e.value > num_removed) {
            e.value = e.value - 1;
          }
        })
      }
    }

    // Remove deselected
    const updated = exerciseStates.filter(e => currentSet.has(e.id));


    // Add newly selected (preserving order)
    selected.forEach(id => {
      if (!updated.find(e => e.id === id)) {
        updated.push({ id, value: nextNumberRef.current++ });
      }
    });

    selectedExercises.current = selected;
    setExerciseStates(updated);
    setWorkoutData(prev => {
      const exercises = updated.map(entry => {
        return {exerciseId: entry.id, setData: [{reps: 8, weight: 0}]}
      })

      const newExercises = []
      for (let i = 0; i < exercises.length; i++) {
        if (!workoutData.exercises.find(e => e.exerciseId === exercises[i].exerciseId))
          newExercises.push(exercises[i])
      }

      console.log("New Exercises")
      console.log(newExercises)
      return {
        ...prev,
        exercises: [
          ...prev.exercises,
          ...newExercises
        ]
      }
    })
  }

  const numberMap = useMemo(() => {
    const map = new Map<string, number>();
    exerciseStates.forEach(({id, value}) => map.set(id,value));
    return map;
  }, [exerciseStates]);

  if (step === 0) {
    return (
      <CheckboxGroup value={selectedExercises.current} onValueChange={handleValueChange}>
        <SimpleGrid gap={4}>
          {exercises.map( exercise => (
            <MiniExerciseCard
              key={exercise._id}
              exercise={exercise}
              number={numberMap.get(exercise._id) ?? -1}
            />
          ))}
        </SimpleGrid>
      </CheckboxGroup>
    );
  }

  if (step === 1) {
    const moveElementUp = (index) => {
      // TODO: Is there a better way of swapping elements in state than making a complete copy? maybe something with a memoization structure?
      const reordered_exercise = exerciseStates[index]; // this is the exercise that needs moved up

      if (index == 0 || exerciseStates.length <= 1) return; // don't do anything if at top or with 1 element

      const states = [...exerciseStates]; // make a copy of exerciseStates

      // swap elements
      states[index] = states[index - 1]; // move the element above down 1
      states[index-1] = reordered_exercise; // assign the selected element to the slot above

      setCurrentElement(index-1)
      setExerciseStates(states) // set the new state
    }

    const moveElementDown = (index) => {
      // TODO: Is there a better way of swapping elements in state than making a complete copy? maybe something with a memoization structure?
      const reordered_exercise = exerciseStates[index]; // this is the exercise that needs moved up

      if (index == exerciseStates.length - 1 || exerciseStates.length <= 1) return; // don't do anything if at bottom or with 1 element

      const states = [...exerciseStates]; // make a copy of exerciseStates

      // swap elements
      states[index] = states[index + 1]; // move the element below up 1
      states[index + 1] = reordered_exercise; // assign the selected element to the slot above

      console.log("setting index to " + (index + 1))
      setCurrentElement(index+1)
      setExerciseStates(states) // set the new state
    }

    const handleWorkoutSet = (id, data) => {
      console.log("Called it")
      setWorkoutData(prev => {
        const currentExerciseIndex = prev.exercises.findIndex(e => e.exerciseId === id);
        if (currentExerciseIndex === -1) {
          return {
            ...prev,
            exercises: [...prev.exercises, {exerciseId: id, setData: data}]
          }
        }
        console.log("Updating " + currentExerciseIndex)
  
        // update the currentWorkout
        const updatedExercise = {
          ...prev.exercises[currentExerciseIndex],
          setData: data,
        }

        const updatedExercises = [...prev.exercises];
        updatedExercises[currentExerciseIndex] = updatedExercise;

        return {
          ...prev,
          exercises:updatedExercises,
        }
      });
    }

    return (
      <VStack gap={4}>
        {exerciseStates.map((id, index) => {
          const exercise = exercises.find(e => e._id === id.id);
          let setData = [];
          if (exercise) {
            const exerciseData = workoutData.exercises.find(e => e.exerciseId == exercise._id)
            setData = exerciseData?.setData ?? [{reps: 8, weight: 0}]
            console.log(setData)
          }

          return exercise ? <RepCard key={exercise._id} exercise={exercise} moveElementUp={() => moveElementUp(index)} moveElementDown={() => moveElementDown(index)} clicked={currentElement === index} setCurrentElement={() => setCurrentElement(index)} workoutData={setData} setWorkoutData={(data) => handleWorkoutSet(exercise._id, data)}/> : null;
        })}
      </VStack>
    );
  }

  if (step >= 2) {
    // add all selectedExercises to set data
    console.log("Workout data")
    console.log(workoutData)
    return (
      <VStack gap={4}>
        {workoutData.exercises.map(exercise => {
          return <ExerciseReviewCard setsData={exercise.setData} exercise={exercises.find(e => e._id === exercise.exerciseId)} />
        })}
      </VStack>
    )
  }
};

const WorkoutDialogStepContent = ({ exercises, selectedExercises, numbers, workout }: {
  exercises: Exercise[];
  selectedExercises: React.RefObject<string[]>;
  numbers: React.RefObject<number[]>;
  workout: Workout;
}) => {
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

  useEffect(() => {
    console.log("WorkoutDialogStepContent mounted");
    return () => console.log("WorkoutDialogStepContent unmounted");
  }, []);
  
  return (
    <>
      <Dialog.Body>
        <WorkoutSubComponent step={step} exercises={exercises} selectedExercises={selectedExercises} numbers={numbers} workout={workout}/>
      </Dialog.Body>
      <Dialog.Footer>
        <Button variant="outline" onClick={decrementStep}>Back</Button>
        {step === 3 && 
          <Dialog.ActionTrigger asChild>
            <Button
              colorPalette="blue"
              onClick={resetStep}
              >Finish</Button>
          </Dialog.ActionTrigger>
        }
        {step !== 3 && <Button
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