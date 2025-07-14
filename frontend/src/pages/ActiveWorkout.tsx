import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, CloseButton, Container, Flex, Button, Center, ActionBar, Portal, Text } from '@chakra-ui/react'
import { useWorkoutStore, Workout } from '@/store/workout';
import { useUserStore } from '@/store/user';
import WorkoutCard from '@/components/activeWorkout/WorkoutCard';
import { FaLayerGroup } from "react-icons/fa";
import DetailedExerciseCard from '@/components/activeWorkout/DetailedExerciseCard';

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

  const [pageContent, setPageContent] = useState(false)

  const topPageSelection = () => {
    if (pageContent) {
      return <Text>Exercise Name</Text>
    }

    return <Text>Workout Name</Text>
  }

  // function to set up page for start of workout
  const centerPageSelection = () => {
    if (pageContent) {
      return <DetailedExerciseCard />
    }

    return (
      <WorkoutCard workout={workout} select={checked} setCount={setCount} />
    )
  }

  const bottomPageSelection = () => {
    if (pageContent) {
      return (
        <Flex justify={"space-between"} w={"40vw"}>
          <Button colorPalette="green" >&lt;</Button>
          <Button colorPalette="green" px={"10"} py={"5"}>Log</Button>
          <Button colorPalette="green" onClick={() => setPageContent(prevPageContent => !prevPageContent)}>&gt;</Button>
        </Flex>
      )
    }

    return (
      <Flex justify={"space-between"} w={"20vw"}>
        <Button variant="subtle" colorPalette="green" px={"10"} py={"5"} onClick={() => setChecked(prevCheck => !prevCheck)} >Select</Button>
        <Button colorPalette="green" px={"10"} py={"5"} onClick={() => setPageContent(prevPageContent => !prevPageContent)}>Start</Button>
        {/* <Button variant="subtle" disabled colorPalette="green" px={"10"} py={"5"}>Group</Button> */}
      </Flex>
    )
  }

  return (
    <>
      <Container h={"100vh"} w={"100vw"} justifyContent={"space-between"}>
        <Center>
          {topPageSelection()}
        </Center>
        <Center>
          <Flex direction={'column'} justify={'flex-start'} maxH={"90vh"}>
            <Box w={"80vw"} justifyContent={"flex-start"} padding={4}>
              <CloseButton variant="solid" onClick={handleClick} />
            </Box>
            {centerPageSelection()}
          </Flex>
        </Center>
        <Center>
          {bottomPageSelection()}
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