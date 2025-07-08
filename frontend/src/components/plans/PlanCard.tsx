import { Card, HStack, IconButton, Link as ChakraLink, LinkOverlay } from "@chakra-ui/react"
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import { FaPlay } from "react-icons/fa6";
import WorkoutDays from "./WorkoutDays"
import dialog from '@/components/plans/PlanDialogue'
import { useCallback, useEffect, useState } from "react"
import Content from "./PlanDialogueContent"
import {Link as ReactRouterLink} from 'react-router-dom'
import { useUserStore } from "@/store/user";

export interface WorkoutEntry {
  workoutTitle: string,
  workoutId: string,
  workoutDays: number,
}

const PlanCard = ({cardName} : {cardName : string}) => {
  // need state for the workout data (days of workout and type of workout)
  const [planData, setPlanData] = useState<WorkoutEntry[]>([{workoutTitle:"Squat Day", workoutId:"686c42fac55236162eb95f97", workoutDays:7}, {workoutTitle:"Deadlift Day", workoutId:"686c42fac55236162eb95f97", workoutDays:56}]);
  const [isOpen, setIsOpen] = useState(false);
  const start = 0b1;
  const {currentDay} = useUserStore();

  const handleUpdatePlanData = (workoutTitle, day) => {
    setPlanData(prev => {
      
      
      const oldData = [...prev];
      const indexToUpdate = oldData.findIndex(item => item.workoutTitle == workoutTitle)
      let newData;
      if (indexToUpdate != -1) {
        // first check that the following day can be added
        const dayShifted = start << day;
        for (let i = 0; i < oldData.length; i++) {
          if (dayShifted & oldData[i].workoutDays && oldData[i].workoutTitle !== workoutTitle) // if there is crossover and the titles are not the same then flip the other day too
            oldData[i].workoutDays ^= dayShifted;
        }
        newData = {workoutTitle: workoutTitle, workoutDays: oldData[indexToUpdate].workoutDays ^ dayShifted}; // use XOR to flip the specified bit

        oldData[indexToUpdate] = newData; // update the index with the new data
        console.log(newData);
      } else {
        return prev;
      }

      console.log("Returning", [...oldData.filter(item => item.workoutTitle != workoutTitle), newData])
      return oldData;
    })
  }

  const handleOpenChange = useCallback(() => {
    dialog.close("a")
    setIsOpen(false);
  }, [])

  useEffect(() => {
    if(isOpen) {
      dialog.update("a", {
        title: "Updated title",
        content: <Content planData={planData} handleUpdatePlanData={(workout, days) => handleUpdatePlanData(workout, days)}/>,
      })
    }
  }, [planData, isOpen])

  return (
    <>
    <Card.Root variant={'subtle'} w="lg" overflow={"hidden"}>
      <Card.Body>
        <Card.Title textAlign={"center"} paddingBottom={"5"} textStyle={"3xl"}>{cardName}</Card.Title>
        <Card.Description>
          <WorkoutDays planData={planData}/>
        </Card.Description>
      </Card.Body>
      <LinkOverlay asChild>
        <ChakraLink onClick={() => {
          setIsOpen(true);
          dialog.open("a", {
            title: "Workout Creation",
            content: <Content planData={planData} handleUpdatePlanData={(workout, days) => handleUpdatePlanData(workout, days)}/>,
            handleOpenChange: handleOpenChange
          })}
        }></ChakraLink>
      </LinkOverlay>
      <Card.Footer justifyContent={"flex-end"}>
        <HStack justify={"space-between"} w="full">
          <ChakraLink unstyled asChild variant={"plain"}>
            <ReactRouterLink to={`/activeworkout/${planData[currentDay].workoutId}`}><IconButton colorPalette={"green"}><FaPlay /></IconButton></ReactRouterLink>
          </ChakraLink>
          <HStack>
            <IconButton colorPalette={"blue"}><FaEdit /></IconButton>
            <IconButton colorPalette={"red"}><AiTwotoneDelete /></IconButton>
          </HStack>
        </HStack>
      </Card.Footer>
    </Card.Root>
    <dialog.Viewport />
    </>
  )
}

export default PlanCard