import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CloseButton, Container, HStack } from '@chakra-ui/react'
import { useWorkoutStore, Workout } from '@/store/workout';
import { useUserStore } from '@/store/user';

const ActiveWorkout = ({funcNav} : {funcNav: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();
  const {workoutId} = useParams(); 
  const workoutStore = useWorkoutStore();
  const {userID} = useUserStore();

  workoutStore.fetchWorkouts(userID); // Fetch all workouts for the user

  const workout = workoutStore.workouts.find(w => w._id === workoutId);

  useEffect(() => {
    console.log("ActiveWorkout mounted and navbar removed");
    funcNav(false); // remove navbar
  }, []);

  const handleClick = () => {
    funcNav(true); // restore navbar
    navigate(-1); // navigate to workouts page
  }
  
  return (
    <Container>
      <HStack>
        <CloseButton variant="solid" onClick={handleClick} />
        <div>
          ActiveWorkout: {workout ? workout.name : "Loading..."}
        </div>
      </HStack>
    </Container>
  )
}

export default ActiveWorkout