import { Card, IconButton, Link, LinkOverlay } from "@chakra-ui/react"
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaEdit } from 'react-icons/fa'
import WorkoutDays from "./WorkoutDays"
import dialog from '@/components/plans/PlanDialogue'
import { useCallback, useState } from "react"
import Content from "./PlanDialogueContent"

export interface WorkoutEntry {
  workoutTitle: string,
  workoutDays: number,
}

const PlanCard = ({cardName} : {cardName : string}) => {
  // need state for the workout data (days of workout and type of workout)
  const [planData, setPlanData] = useState<WorkoutEntry[]>([{workoutTitle:"Squat Day", workoutDays:7}, {workoutTitle:"Deadlift Day", workoutDays:56}]);
  const start = 0b1;

  const handleUpdatePlanData = (workoutTitle, day) => {
    console.log("Made it here");
    setPlanData(prev => {
      const oldData = [...prev];
      console.log("Got old data", oldData)
      const dataToUpdate = oldData.find(item => item.workoutTitle == workoutTitle)
      console.log("Data to update", dataToUpdate)
      let newData;
      if (dataToUpdate) {
        newData = {workoutTitle: workoutTitle, workoutDays: dataToUpdate.workoutDays | start << day};
        console.log(newData);
      } else {
        return prev;
      }

      console.log("Returning", [...oldData.filter(item => item.workoutTitle != workoutTitle), newData])
      return [...oldData.filter(item => item.workoutTitle != workoutTitle), newData];
    })
  }

  const handleOpenChange = useCallback(() => {
    dialog.close("a")

  }, [])

  return (
    <>
    <Card.Root variant={'subtle'} w="lg" overflow={"hidden"}>
      <Card.Body>
        <Card.Title textAlign={"center"} paddingBottom={"5"}>{cardName}</Card.Title>
        <Card.Description>
          <WorkoutDays planData={planData}/>
        </Card.Description>
      </Card.Body>
      <LinkOverlay asChild>
        <Link onClick={() => {
          console.log("Opening")
          dialog.open("a", {
            title: "Workout Creation",
            content: <Content planData={planData} handleUpdatePlanData={(workout, days) => handleUpdatePlanData(workout, days)}/>,
            handleOpenChange: handleOpenChange
          })}
        }></Link>
      </LinkOverlay>
      <Card.Footer justifyContent={"flex-end"}>
        <IconButton colorPalette={"blue"}><FaEdit /></IconButton>
        <IconButton colorPalette={"red"}><AiTwotoneDelete /></IconButton>
      </Card.Footer>
    </Card.Root>
    <dialog.Viewport />
    </>
  )
}

export default PlanCard