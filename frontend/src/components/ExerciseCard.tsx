import { Button, Card, IconButton, Image } from '@chakra-ui/react'
import { FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";

const ExerciseCard = ({exercise} : {exercise : string}) => {
  
  return (
    <Card.Root variant={'subtle'} maxW="md" overflow={"hidden"}>
      <Image height={"200px"} src='https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt={exercise + " image"}/>
      <Card.Body>
        <Card.Title>{exercise} Exercise</Card.Title>
        <Card.Description>
          Good exercise for back, arms, and legs
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent={"flex-end"}>
        <IconButton colorPalette={"blue"}><FaEdit /></IconButton>
        <IconButton colorPalette={"red"}><AiTwotoneDelete /></IconButton>
      </Card.Footer>
    </Card.Root>
  )
}

export default ExerciseCard