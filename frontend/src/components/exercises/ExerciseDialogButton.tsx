import { useExerciseStore, Exercise } from '@/store/exercise.ts';
import {Button, Dialog, Portal, Input, VStack, CloseButton } from '@chakra-ui/react'
import { JSX, useState } from 'react';
import { toaster } from '../ui/toaster';

const ExerciseDialogButton = ({color, pageButton, dialogButtonTitle, dialogTitle, add, exercise} : {
  color: string;
  pageButton: JSX.Element;
  dialogButtonTitle: string;
  dialogTitle: string;
  add: boolean;
  exercise?: Exercise;
}) => {
  const { createExercise, updateExercise } = useExerciseStore();

  const [newExercise, setNewExercise] = useState<Exercise>(exercise ?? {
    name: "",
    muscleGroup: "",
  }); // some state for saving what users type in the form

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

  const handleUpdateExercise = async () => {
    if (exercise === undefined) return;

    // update the boxes with an updating message
    setNewExercise({name: "Updating...", muscleGroup: "Updating..."});

    const {success, message} = await updateExercise(newExercise);
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
    setNewExercise(useExerciseStore.getState().exercises.find(e => e._id === exercise._id) ?? {name: "", muscleGroup: ""}); // clear the fields of the input boxes
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {pageButton}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{dialogTitle}</Dialog.Title>
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
                colorPalette={color}
                onClick={add ? handleAddExercise : handleUpdateExercise}
                >
                {dialogButtonTitle}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ExerciseDialogButton