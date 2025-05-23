import { Card, Tag, Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { Exercise } from '@/store/exercise'

const ExerciseReviewCard = ({setsData, exercise} :
{
  setsData:{
    reps: number,
    weight: number,
  }[],
  exercise: Exercise,
}) => {
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