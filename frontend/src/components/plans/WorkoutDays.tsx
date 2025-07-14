import React, { use } from 'react'
import { Box, Center, Flex, For, HStack, Text, Timeline, VStack } from "@chakra-ui/react"
import { WorkoutEntry } from './PlanCard'
import { useUserStore } from '@/store/user';

const WorkoutDays = ({planData} : {planData : WorkoutEntry[]}) => {
  const planList = new Array(7).fill(0);
  const {currentDay} = useUserStore();

  for (const item of planData) {
    for (let i = 0; i < 7; i++) {
      if ((item.workoutDays & (1 << i) ) != 0) { // if day present
        console.log("Workout " + (item.workoutTitle) + " on day " + (i))
        planList[i] = item.workoutTitle;
      }
      else if (planList[i] == 0) {
        planList[i] = "Rest Day"
      }
    }
  }

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  return (
    <VStack gap={"0"}>
      <For each={planList}>
      {(item, index) => (
        <Box w={"full"} borderX={"none"} borderY={"solid"} borderWidth={"1px"} borderTopWidth={index == 0 ? "2px" : ""} borderBottomWidth={index == 6 ? "2px" : ""}>
          <HStack py={"2"} w={"full"}>
            <Text w={"full"} textAlign={"end"} paddingRight={"5"} fontWeight={"bold"} textStyle={"2xl"}>{days[index]}</Text>
            <Text w={"full"} color={index === currentDay ? "green.500" : "blue.500"} fontWeight={"bold"} paddingLeft={"5"} textStyle={"2xl"}>{item}</Text>
          </HStack>
        </Box>
      )}
      </For>
    </VStack>
  )
}

export default WorkoutDays