import React from 'react'

const ExerciseSelection = () => {
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
  )
}

export default ExerciseSelection