import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, CloseButton, Container, Flex, VStack } from '@chakra-ui/react'
import { useWorkoutStore, Workout } from '@/store/workout';
import { useUserStore } from '@/store/user';
import ExerciseCards from '@/components/activeWorkout/ExerciseCards';

const ActiveWorkout = ({funcNav} : {funcNav: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();
  const {workoutId} = useParams(); 
  const workoutStore = useWorkoutStore();
  const {userID} = useUserStore();

  
  useEffect(() => {
    console.log("ActiveWorkout mounted and navbar removed");
    funcNav(false); // remove navbar
    workoutStore.fetchWorkouts(userID); // Fetch all workouts for the user
  }, []);
  
  const workout = workoutStore.workouts.find(w => w._id === workoutId);

  const handleClick = () => {
    funcNav(true); // restore navbar
    navigate(-1); // navigate to workouts page
  }

  return (
    <Container h={"100vh"} w={"100vw"} >
    {console.log("ActiveWorkout rendered with workoutId:", workoutId)}
      <Flex direction={'column'} justify={'flex-start'}>
        <Box w={"100%"} display={"flex"} justifyContent={"flex-start"} padding={4}>
          <CloseButton variant="solid" onClick={handleClick} />
        </Box>
        <ExerciseCards workout={workout} />
      </Flex>
    </Container>
  )
}

export default ActiveWorkout