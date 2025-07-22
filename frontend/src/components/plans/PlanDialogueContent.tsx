import { For, Flex, Text, Box, HStack } from "@chakra-ui/react";
import { WorkoutEntry } from "./PlanCard";
import MemoizedTag from "./MemoizedTag";

const Content = ({planData, handleUpdatePlanData} : {planData : WorkoutEntry[], handleUpdatePlanData : (workout: string, days: number) => void}) => {
  console.log("rerendering");

  return (
    <For each={planData}>
      {(workouts) => (
      <Flex justify={"space-between"}>
        <Text alignContent={"center"}>
          {workouts.workoutTitle}
        </Text>
        <Box w={"10px"}/>
        <HStack>
          <For each={["Su", "Mo", "Tu", "Wed", "Th", "Fr", "Sa"]}>
            {(day, index2) => {
              const startColor = workouts.workoutDays & ( 1 << index2)
              return <MemoizedTag key={day + workouts.workoutTitle} workoutTitle={workouts.workoutTitle} day={day} dayIndex={index2} color={startColor} onUpdate={handleUpdatePlanData}/>
            }}
          </For>
        </HStack>
      </Flex>
      )}
    </For>
  );
}

export default Content;