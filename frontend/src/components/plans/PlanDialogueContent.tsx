import { Tag, For, Flex, Text, Box, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { WorkoutEntry } from "./PlanCard";

const TagComponent = ({name, onClick, startColor} : {name: string, onClick: () => void, startColor : number}) => {
  const [color, setColor] = useState(startColor > 0)

  const handleClick = () => {
    setColor(!color);
    onClick();
    console.log("On click done")
  }

  return (
    <Tag.Root justifyContent={"center"} minW={"10"} minH={"10"} asChild variant="solid" colorPalette={color ? "blue" : "gray"}>
      <button type="submit" onClick={handleClick}>
        <Tag.Label>{name}</Tag.Label>
      </button>
    </Tag.Root>
  )
}

const Content = ({planData, handleUpdatePlanData} : {planData : WorkoutEntry[], handleUpdatePlanData : (workout: string, days: number) => void}) => {
  return (
    <For each={planData}>
      {(workouts, index1) => (
      <Flex justify={"space-between"}>
        <Text alignContent={"center"}>
          {workouts.workoutTitle}
        </Text>
        <Box w={"10px"}/>
        <HStack>
          <For each={["Su", "Mo", "Tu", "Wed", "Th", "Fr", "Sa"]}>
            {(day, index2) => (
              <TagComponent name={day} startColor={workouts.workoutDays & ( 1 << index2)} onClick={() => handleUpdatePlanData(workouts.workoutTitle, index2)}/>
            )}
          </For>
        </HStack>
      </Flex>
      )}
    </For>
  );
}

export default Content;