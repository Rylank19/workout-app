import React from 'react'
import { Center, Flex, For, Timeline } from "@chakra-ui/react"
import { WorkoutEntry } from './PlanCard'

const WorkoutDays = ({planData} : {planData : WorkoutEntry[]}) => {
  const planList = new Array(7);

  for (const item of planData) {
    for (let i = 0; i < 7; i++) {
      if ((item.workoutDays & (1 << i) ) != 0) { // if day present
        planList[i] = item.workoutTitle;
      }
      else {
        planList[i] = "Rest Day"
      }
    }
  }

  const days = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."]

  return (
      <Timeline.Root alignItems={"center"} size={"md"} key={"md"}>
        <For each={planList}>
        {(item, index) => (
          <Timeline.Item>
            <Timeline.Content alignItems={"center"} w={"20"}>
              <Timeline.Title>{days[index]}</Timeline.Title>
            </Timeline.Content>
            <Timeline.Connector display={"flex"} direction={"column"} justifyContent={"center"} w={"20"}>
              <Timeline.Separator position={"relative"} top={"0"}/>
              <Timeline.Indicator>{index}</Timeline.Indicator>
            </Timeline.Connector>
            <Timeline.Content alignItems={"center"} w={"20"}>
              <Timeline.Title>
                {item}
              </Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        )}
        </For>
      </Timeline.Root>
  )
}

export default WorkoutDays