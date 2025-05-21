import { Exercise } from '@/store/exercise';
import { CheckboxGroup, SimpleGrid, VStack, Text, Button, Center, CloseButton, Dialog, Steps} from '@chakra-ui/react';
import { useCallback, useMemo, useRef, useState } from 'react'
import MiniExerciseCard from './ExerciseMiniCard';
import RepCard from './RepCard';
import { MdUpdateDisabled } from 'react-icons/md';

const WorkoutSubComponent = ({ step, exercises, selectedExercises }: {
  step: number;
  exercises: Exercise[];
  selectedExercises: React.RefObject<string[]>;
}) => {
  // state for order of selecting exercises
  interface numberEntries {
    id: string;
    value: number
  }

  const [exerciseStates, setExerciseStates] = useState<numberEntries[]>([]);
  const nextNumberRef = useRef(1);
  // state for step 1
  const [currentElement, setCurrentElement] = useState<number>(-1); // -1 indicates no element selected

  const handleToggle = (id: string) => {
    setExerciseStates(prev => {
      const exists = prev.find(e => e.id === id);
      let updated;

      if (exists) {
        updated = prev.filter(e => e.id !== id);
      } else {
        const value = nextNumberRef.current;
        nextNumberRef.current += 1;
        updated = [...prev, { id, value: value }]
      }
      selectedExercises = updated.map(e => e.id);
      return updated;
    });
  }

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
          {exercises.map(exercise => (
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

    return (
      <VStack gap={4}>
        {exerciseStates.map((id, index) => {
          const exercise = exercises.find(e => e._id === id.id);
          return exercise ? <RepCard key={exercise._id} exercise={exercise} moveElementUp={() => moveElementUp(index)} moveElementDown={() => moveElementDown(index)} clicked={currentElement === index} setCurrentElement={() => setCurrentElement(index)}/> : null;
        })}
      </VStack>
    );
  }

  return <Text>Step {step}</Text>;
};

const WorkoutDialogStepContent = ({ exercises, selectedExercises }: {
  exercises: Exercise[];
  selectedExercises: React.RefObject<string[]>;
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

  return (
    <>
      <Dialog.Body>
        <WorkoutSubComponent step={step} exercises={exercises} selectedExercises={selectedExercises}/>
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
          <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
        </Steps.Root>
      </Center>
    </>
  )
}

export default WorkoutDialogStepContent