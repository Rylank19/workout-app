import ExerciseCard from '@/components/exercises/ExerciseCard'
import { Toaster, toaster } from '@/components/ui/toaster'
import { useExerciseStore } from '@/store/exercise'
import { useUserStore } from '@/store/user'
import {Button, Container, Flex, Float, Text, Dialog, Portal, Input, VStack, CloseButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const ExercisesPage = () => {
  const {fetchExercises, createExercise, exercises} = useExerciseStore();
  const {userID} = useUserStore();

  const [newExercise, setNewExercise] = useState({
    userID: userID,
    name: "",
    muscleGroup: "",
  }); // some state for saving what users type in the form

  useEffect(() => {
    fetchExercises(userID);
  }, [fetchExercises, userID])
  console.log("exercises", exercises)

  const handleAddExercise = async () => {
    const {success, message} = await createExercise(newExercise);
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
        title: `Message: ${message}`,
        type: "success",
        action: {
          label: "Close",
          onClick: () => console.log("Closed"),
        }
      })
    }
    setNewExercise({...newExercise, name: "", muscleGroup: ""}); // clear the fields of the input boxes
  }

  return (
    <Container h={"85vh"} position={"relative"}>
      <Toaster/>
      {/* <Flex direction="column" justify={"space-between"} height={"85vh"}> */}
        {exercises.length === 0 && (<Text>Nothing to see here...</Text>)}
        <Flex h={"85vh"} gap={4} flexWrap={'wrap'} overflow={"scroll"} scrollbar={"hidden"}>
          {exercises.map((exercise) => {
            return <ExerciseCard key={exercise._id} exercise={exercise} />
          })}
        </Flex>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Float placement={"bottom-center"} offsetY={"10"}>
              <Button>Create New Exercise</Button>
            </Float>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Exercise Creation</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <VStack gap={4}>
                    <Input
                      placeholder="Exercise Name"
                      name="name"
                      value={newExercise.name} // link to new product above
                      onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value}) } // populates with the newExercise fields when using ...
                    />
                    <Input
                      placeholder="Muscle Group"
                      name="muscleGroup"
                      value={newExercise.muscleGroup} // link to new product above
                      onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value}) }
                    />

                  </VStack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    colorPalette="blue"
                    onClick={handleAddExercise}
                    >
                    Add Exercise
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      {/* </Flex> */}
    </Container>
  )
}

export default ExercisesPage