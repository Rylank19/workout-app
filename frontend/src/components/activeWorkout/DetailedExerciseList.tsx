import { useState } from 'react'
import { NumberInput, Card, HStack, Text, For, Container, Flex, VStack, Separator, CloseButton, Button, Center } from '@chakra-ui/react'
import { toaster } from "@/components/ui/toaster"
import { Workout } from '@/store/workout'
import { Exercise } from '@/store/exercise'

interface WorkoutSet {
  reps: number;
  weight: number;
}

interface WorkoutExerciseData {
  exerciseId: string;
  set_data: WorkoutSet[];
}

const DetailedExerciseList = ({exercises, workout, handleClick} : {exercises : Exercise[], workout : Workout | undefined, handleClick : () => void}) => {
  const exerciseIds = workout?.exercises.map(exercise => exercise.exerciseId)
  const exerciseNames = exercises.filter(exercise => exerciseIds?.includes(exercise._id)).map(exercise => exercise.name)

  const startingExercises = workout?.exercises.map(ex => ({exerciseId : ex.exerciseId, set_data : ex.set_data})) ?? [];

  const [currentExercise, setCurrentExercise] = useState(0)
  const [currentSets, setCurrentSets] = useState(Array(exerciseNames.length).fill(0));
  const [workoutSets, setWorkoutSets] = useState<WorkoutExerciseData[]>(startingExercises);


  if (workout === undefined || exerciseIds === undefined) return <Text>No workout loaded...</Text>

  let sets: WorkoutExerciseData | undefined = workoutSets.find((exercise) => exercise.exerciseId === exerciseIds[currentExercise]);

  if (sets === undefined) return <Text>No sets for current workout found... making one now</Text>

  sets = {exerciseId: exerciseIds[currentExercise], set_data: [{reps: 0, weight: 0}]};

  const completeWorkout = () => {
    toaster.create({
      description: "Workout Finished",
      type: "info"
    })
    handleClick()
  }

  const moveForward = () => {
    if (currentExercise < exerciseNames.length - 1) {
      setCurrentExercise(prevExercise => prevExercise + 1)
      return true
    }
    return false
  }

  const moveBackward = () => {
    if (currentExercise > 0)
      setCurrentExercise(prevExercise => prevExercise - 1)
  }

  const logExercise = () => {
    setCurrentSets(prevSets => {
      const updatedSets = prevSets.map((set, index) => {
        if (index === currentExercise)
          return set+1;
        else
          return set;
      })
      return updatedSets;
    })
    moveForward();
    toaster.create({
      description: "Set Completed",
      type: "success"
    })
  }

  // this function takes a given set number and identifier and adds it to current workout
  const handleChange = (type : string, value : number, setNumber : number) => {
    if (exerciseIds === undefined) return;

    const exerciseId = exerciseIds[currentExercise];

    setWorkoutSets(prevWorkout => {
      const updatedSets = prevWorkout.map((entry) => {
        if (entry.exerciseId === exerciseId) { // changing the exercise that has a new set value
          const updatedSetData = entry.set_data.map((singleSet, index) => {
            if (index === setNumber) {
              if (type === "reps")
                return {reps: value, weight: singleSet.weight}
              else if (type === "weight")
                return {reps: singleSet.reps, weight: value}
              else
                return singleSet;
            } else
              return singleSet;
          })
          return ({exerciseId : entry.exerciseId, set_data: updatedSetData})
        }
        else return entry;
      });
      return updatedSets;
    })
  }

  const variant = (logged : boolean) => {
    if (logged) {
      return {
        border:"green",
        borderStyle:"solid",
        borderWidth:"2px",
        buttonColorUp:"",
        buttonColorDown:"",
      }
    }

    return {
      border:"",
      borderStyle:"",
      borderWidth:"1px",
      buttonColorUp:"gray.700",
      buttonColorDown:"gray.700",
    }
  }

  return (
    <>
      <Container h={"100vh"} w={"100vw"} justifyContent={"space-between"}>
        <Center>
          <Text fontSize={"3xl"}>{exerciseNames[currentExercise]}</Text>
        </Center>
        <Center>
          <Flex direction={'column'} justify={'flex-start'} maxH={"90vh"}>
            <Container h={"90vh"}>
              <Flex justify={"space-between"}>
                <CloseButton variant="solid" marginBottom={"4"} onClick={handleClick} />
                <Button variant="solid" colorPalette={"green"} marginBottom={"4"} onClick={completeWorkout}>Finish</Button>
              </Flex>
              <VStack>

                <For each={sets?.set_data}>
                  {(item, index) => (<SingleSet value={item} setNumber={index} currentSet={currentSets[currentExercise]} handleChange={handleChange} variant={variant}/>)}
                </For>
              </VStack>
            </Container>
          </Flex>
        </Center>
        <Center>
          <Flex justify={"space-between"} w={"30vw"}>
            <Button colorPalette="green" py={"5"} onClick={() => moveBackward()}>&lt;</Button>
            <Button colorPalette="green" px={"10"} py={"5"} onClick={() => logExercise()}>Log</Button>
            <Button colorPalette="green" py={"5"} onClick={() => moveForward()}>&gt;</Button>
          </Flex>
        </Center>
      </Container>
    </>
  )

}

const SingleSet = ({value, setNumber, currentSet, handleChange, variant} : {value : WorkoutSet, setNumber : number, currentSet : number, handleChange: (type: string, value: number, setNumber: number) => void
  variant: (logged: boolean) => {
    border: string;
    borderStyle: string;
    borderWidth: string;
    buttonColorUp: string;
    buttonColorDown: string;
}
}) => {
  const variantOptions = variant(setNumber < currentSet)

  return (
    <>
      <Card.Root border={variantOptions.border} borderStyle={variantOptions.borderStyle} borderWidth={variantOptions.borderWidth}>
        <Card.Body>
          <Flex gap={"4"}>
            <HStack flexGrow={1} gapX={"10"}>
              <Text fontSize={"md"}>Reps</Text>
              <NumberInput.Root size={"md"} value={value.reps.toString()} onValueChange={(value) => handleChange("reps", value.valueAsNumber || 0, setNumber)} >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </HStack>
            <Separator orientation={"vertical"} />
            <HStack flexGrow={1} gap={"10"}>
              <Text fontSize={"md"}>Weight</Text>
              <NumberInput.Root size={"md"} value={value.weight.toString()} onValueChange={(value) => handleChange("weight", value.valueAsNumber || 0, setNumber)}>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
            </HStack>
          </Flex>
        </Card.Body>
      </Card.Root>
    </>
  )
}

export default DetailedExerciseList