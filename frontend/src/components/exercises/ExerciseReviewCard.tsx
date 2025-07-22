import { Card, Tag, Text, HStack } from '@chakra-ui/react'
import { Exercise } from '@/store/exercise'

const ExerciseReviewCard = ({setsData, exercise} :
{
  setsData:{
    reps: number,
    weight: number,
  }[],
  exercise: Exercise | undefined,
}) => {
  if (exercise === undefined) return <Text>Missing exercise...</Text>

  return (
    <Card.Root w="full">
      <Card.Header>
        {exercise.name}
      </Card.Header>
      <Card.Body>
        <HStack>
          {setsData.map( (set, index) => {
            return (
              <Tag.Root w={"fit"} colorPalette={"teal"}>
                <Tag.Label>
                  <Text>Set {index + 1}: {set.reps} reps / {set.weight} lbs</Text>
                </Tag.Label>
              </Tag.Root>
          )})}
        </HStack>
      </Card.Body>
    </Card.Root>
  )
}

export default ExerciseReviewCard