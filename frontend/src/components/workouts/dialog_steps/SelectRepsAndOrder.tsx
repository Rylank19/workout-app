import { VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import RepCard from '../RepCard';
import { Workout } from '@/store/workout';
import { Exercise } from '@/store/exercise';

interface NumberEntries {
  id: string;
  value: number
}

interface Props {
  exercises: Exercise[]
  exerciseNumbering: NumberEntries[]
  setExerciseNumbering: React.Dispatch<React.SetStateAction<NumberEntries[]>>
  workoutData: Workout
  setWorkoutData: React.Dispatch<React.SetStateAction<Workout>>
}

const SelectRepsAndOrder : React.FC<Props> = ({exercises, exerciseNumbering, setExerciseNumbering, workoutData, setWorkoutData}) => {

  const [currentElement, setCurrentElement] = useState<number>(-1); // -1 indicates no element selected
  const moveElementUp = (index) => {
    // TODO: Is there a better way of swapping elements in state than making a complete copy? maybe something with a memoization structure?
    const reordered_exercise = exerciseNumbering[index]; // this is the exercise that needs moved up

    if (index == 0 || exerciseNumbering.length <= 1) return; // don't do anything if at top or with 1 element

    const states = [...exerciseNumbering]; // make a copy of exerciseStates

    // swap elements
    states[index] = states[index - 1]; // move the element above down 1
    states[index-1] = reordered_exercise; // assign the selected element to the slot above

    setCurrentElement(index-1)
    setExerciseNumbering(states) // set the new state
  }

  const moveElementDown = (index) => {
    // TODO: Is there a better way of swapping elements in state than making a complete copy? maybe something with a memoization structure?
    const reordered_exercise = exerciseNumbering[index]; // this is the exercise that needs moved up

    if (index == exerciseNumbering.length - 1 || exerciseNumbering.length <= 1) return; // don't do anything if at bottom or with 1 element

    const states = [...exerciseNumbering]; // make a copy of exerciseStates

    // swap elements
    states[index] = states[index + 1]; // move the element below up 1
    states[index + 1] = reordered_exercise; // assign the selected element to the slot above

    console.log("setting index to " + (index + 1))
    setCurrentElement(index+1)
    setExerciseNumbering(states) // set the new state
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
    console.log(workoutData)
  }

  return (
    <VStack gap={4}>
      {exerciseNumbering.map((id, index) => {
        const exercise = exercises.find(e => e._id === id.id);
        let setData : {reps: number, weight: number}[] = [];
        if (exercise) {
          const exerciseData = workoutData.exercises.find(e => e.exerciseId == exercise._id)
          setData = exerciseData?.setData ?? []
          console.log(setData)
        }

        return exercise ? <RepCard key={exercise._id} exercise={exercise} moveElementUp={() => moveElementUp(index)} moveElementDown={() => moveElementDown(index)} clicked={currentElement === index} setCurrentElement={() => setCurrentElement(index)} workoutData={setData} setWorkoutData={(data) => handleWorkoutSet(exercise._id, data)}/> : null;
      })}
    </VStack>
  );
}

export default SelectRepsAndOrder