import ExerciseCard from '@/components/exercises/ExerciseCard'
import { Toaster } from '@/components/ui/toaster'
import { useExerciseStore } from '@/store/exercise'
import { useUserStore } from '@/store/user'
import { Container, Flex, Text, Button, Float } from '@chakra-ui/react'
import { useEffect } from 'react'
import ExerciseDialogButton from '@/components/exercises/ExerciseDialogButton'

const ExercisesPage = () => {
  const {fetchExercises, exercises} = useExerciseStore();
  const {userID} = useUserStore();

  useEffect(() => {
    fetchExercises(userID);
  }, [fetchExercises, userID])
  console.log("exercises", exercises)

  return (
    <Container gap={"4"} h={"85vh"} position={"relative"}>
      <Toaster/>
        {exercises.length === 0 && (<Text>Nothing to see here...</Text>)}
        <Flex h={"full"} gap={4} flexWrap={'wrap'} overflow={"scroll"} scrollbar={"hidden"}>
          {exercises.map((exercise) => {
            return <ExerciseCard key={exercise._id} exercise={exercise} />
          })}
        </Flex>
        <ExerciseDialogButton
          color={"blue"}
          pageButton={
            <Float placement={"bottom-center"} offsetY={"10"}>
              <Button>Create New Exercise</Button>
            </Float>
          }
          dialogButtonTitle={"Add Exercise"}
          dialogTitle={"Exercise Creation"}
          add={true}
        />
    </Container>
  )
}

export default ExercisesPage