import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, CloseButton, Container, Flex, Button, Center, ActionBar, Portal } from '@chakra-ui/react'
import { useWorkoutStore, Workout } from '@/store/workout';
import { useUserStore } from '@/store/user';
import ExerciseCards from '@/components/activeWorkout/ExerciseCards';
import { FaLayerGroup } from "react-icons/fa";

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

  // Checks if the select button has been clicked or not
  const [checked, setChecked] = useState(false)

  // Keep track of number of exercises selected
  const [count, setCount] = useState(0)

  return (
    <>
      <Container h={"100vh"} w={"100vw"} justifyContent={"space-between"}>
        <Center>
          <Flex direction={'column'} justify={'flex-start'} maxH={"90vh"}>
            <Box w={"100%"} display={"flex"} justifyContent={"flex-start"} padding={4}>
              <CloseButton variant="solid" onClick={handleClick} />
            </Box>
            <ExerciseCards workout={workout} select={checked} setCount={setCount} />
          </Flex>
        </Center>
        <Center>
          <Flex justify={"space-between"} w={"20vw"}>
            <Button variant="subtle" colorPalette="green" px={"10"} py={"5"} onClick={() => setChecked(prevCheck => !prevCheck)} >Select</Button>
            <Button colorPalette="green" px={"10"} py={"5"}>Start</Button>
            {/* <Button variant="subtle" disabled colorPalette="green" px={"10"} py={"5"}>Group</Button> */}
          </Flex>
        </Center>
      </Container>
      <ActionBar.Root open={checked} onOpenChange={(e) => setChecked(e.open)} closeOnInteractOutside={false}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {count} selected
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm" onClick={() => console.log("hello")}>
                <FaLayerGroup />
                Group
              </Button>
              <ActionBar.CloseTrigger asChild>
                <CloseButton size="sm" />
              </ActionBar.CloseTrigger>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  )
}

export default ActiveWorkout