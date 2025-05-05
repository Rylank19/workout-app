import { Center, CheckboxCard } from '@chakra-ui/react'
import { Exercise } from '@/store/exercise.ts';


const MiniExerciseCard = ({exercise} : {exercise : Exercise}) => {
  return (
    <CheckboxCard.Root variant={'outline'} key={exercise._id} value={exercise._id} colorPalette={"teal"}>
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Content>
          <CheckboxCard.Label>{exercise.name}</CheckboxCard.Label>
        </CheckboxCard.Content>
        <CheckboxCard.Indicator />
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  )
}

export default MiniExerciseCard