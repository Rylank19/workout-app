import { Center, CheckboxCard, Text } from '@chakra-ui/react'
import { Exercise } from '@/store/exercise.ts';
import { useRef, useState } from 'react';


const MiniExerciseCard = ({exercise, number, onToggle} : {exercise : Exercise, number: number, onToggle?: () => void}) => {
  return (
    <CheckboxCard.Root variant={'outline'} key={exercise._id} value={exercise._id} colorPalette={"teal"} onClick={onToggle}>
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control p={0} alignContent={"center"} alignItems={"center"}>
        <CheckboxCard.Content p={5}>
          <CheckboxCard.Label>{exercise.name}</CheckboxCard.Label>
        </CheckboxCard.Content>
        {/* <CheckboxCard.Indicator /> */}
        {number !== -1 &&
          <Center w={"30px"} h={"30px"} bg={"teal"} rounded={"lg"} m={3}>
            <Text>{number}</Text>
          </Center>
        }
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

export default MiniExerciseCard