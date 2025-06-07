import { Card, IconButton, Image } from '@chakra-ui/react'
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { Toaster, toaster } from '@/components/ui/toaster';
import { Exercise, useExerciseStore } from '@/store/exercise.ts';
import { useUserStore } from '@/store/user.ts';


const ExerciseCard = ({exercise} : {exercise : Exercise}) => {
  const {deleteExercise} = useExerciseStore();
  const {userID} = useUserStore();
  const handleDeleteExercise = async (uid: string, eid : string) => {
    const {success, message} = await deleteExercise(uid, eid);
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
        title: `Exercise Deleted Successfully`,
        type: "success",
        action: {
        label: "Close",
        onClick: () => console.log("Closed"),
        }
    })
    }
}

  return (
    <Card.Root variant={'subtle'} maxW="md" overflow={"hidden"} key={exercise._id}>
      <Toaster />
      <Image height={"200px"} src='https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt={exercise + " image"}/>
      <Card.Body>
        <Card.Title>{exercise.name} Exercise</Card.Title>
        <Card.Description>
          Muscle Group: {exercise.muscleGroup}
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"}>
        <IconButton colorPalette={"blue"}><FaEdit /></IconButton>
        <IconButton colorPalette={"red"} onClick={() => handleDeleteExercise(userID, exercise._id)}><AiTwotoneDelete /></IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default ExerciseCard