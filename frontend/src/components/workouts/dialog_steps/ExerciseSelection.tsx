import MiniExerciseCard from '@/components/exercises/ExerciseMiniCard';
import { Exercise } from '@/store/exercise';
import { Workout } from '@/store/workout';
import { CheckboxGroup, SimpleGrid } from '@chakra-ui/react';
import React from 'react';

interface NumberEntries {
  id: string;
  value: number
}

interface ExerciseSelectionProps {
  exercises: Exercise[]
  exerciseNumbering: NumberEntries[]
  setExerciseNumbering: React.Dispatch<React.SetStateAction<NumberEntries[]>>
  workoutData: Workout
  setWorkoutData: React.Dispatch<React.SetStateAction<Workout>>
}

const ExerciseSelection : React.FC<ExerciseSelectionProps> = ({exercises, exerciseNumbering, setExerciseNumbering, workoutData, setWorkoutData}) => {
  const handleValueChange = (selected: string[]) => {
    const currentSet = new Set(selected);      

    if (selected.length < exerciseNumbering.length) {// element was removed
      const difference_array = exerciseNumbering.filter(x => !selected.includes(x.id)); // get the element that is different

      let difference : NumberEntries;
      if (difference_array.length != 1)
        console.log("Why did this happen?")
      else
        difference = difference_array[0];

      // get the number associated with the element removed
      const num_removed = exerciseNumbering.find(e => e.id === difference.id)!.value

      if (num_removed != exerciseNumbering.length) { // we gotta change the numbers so there are no gaps
        exerciseNumbering.forEach(e => {
          if (e.value > num_removed) {
            e.value = e.value - 1;
          }
        })
      }
    }

    // Remove deselected
    const updated = exerciseNumbering.filter(e => currentSet.has(e.id));

    // Add newly selected (preserving order)
    selected.forEach(id => {
      if (!updated.find(e => e.id === id)) {
        const len = exerciseNumbering.length + 1;
        updated.push({ id, value: len });
      }
    });

    setExerciseNumbering(updated);
    setWorkoutData(prev => {
      const exercises = updated.map(entry => {
        return {exerciseId: entry.id, set_data: [{reps: 8, weight: 0}]}
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

  return (
    <CheckboxGroup value={exerciseNumbering.map(e => e.id)} onValueChange={handleValueChange}>
      <SimpleGrid gap={4}>
        {exercises.map( exercise => (
          <MiniExerciseCard
            key={exercise._id}
            exercise={exercise}
            number={exerciseNumbering.find(e => e.id === exercise._id)?.value ?? -1}
          />
        ))}
      </SimpleGrid>
    </CheckboxGroup>
  )
}

export default ExerciseSelection