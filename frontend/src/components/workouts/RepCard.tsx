import { Exercise } from "@/store/exercise";
import { Button, Card, Field, HStack, NumberInput, VStack, Text, Center, IconButton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

const RepCard = ({exercise, moveElementUp, moveElementDown, clicked, setCurrentElement, workoutData, setWorkoutData} : 
{exercise: Exercise, moveElementUp: () => void, moveElementDown: () => void, clicked : boolean, setCurrentElement : () => void,
workoutData : {
    reps: number;
    weight: number;
}[],
setWorkoutData: (data: {
    reps: number;
    weight: number;
}[]) => void }) => 
{

  useEffect(() => {
    // setting up default state for rep data
    if (workoutData.length === 0)
      setWorkoutData([{reps: 8, weight: 100}]);
  })

  const handleChange = (e, value: string, field : string, index : number) => {
    // is a deep copy necessary?
    const newVal = Number(value.split(" ")[0]);
    const array = [...workoutData]; // get the current stored values
    array[index] = {...array[index], [field]: newVal}; // change the value that caused the handleChange to run
    setWorkoutData(array) // set the state to the new weights
  }

  const handleAddInput = () => {
    setWorkoutData([...workoutData, {reps: 8, weight: 0}]); // add a new set with a default of 8 reps
  }

  const handleDeleteInput = () => {
    const newArray = [...workoutData]; // get the weight values
    newArray.pop();
    setWorkoutData(newArray);
  }

  const handleMoveUp = (e) => {
    e.stopPropagation();
    moveElementUp();
  }

  const handleMoveDown = (e) => {
    e.stopPropagation();
    moveElementDown();
  }

  const variant = clicked ? {
    border:"white",
    borderStyle:"solid",
    borderWidth:"1px",
    buttonColorUp:"",
    buttonColorDown:"",
  } : {
    border:"",
    borderStyle:"",
    borderWidth:"1px",
    buttonColorUp:"gray.700",
    buttonColorDown:"gray.700",
  }

  return (
    <Card.Root variant="subtle" w={"full"} border={variant.border} borderStyle={variant.borderStyle} borderWidth={variant.borderWidth} onClick={setCurrentElement}>
      <Card.Header>
        <Card.Title>{exercise.name}</Card.Title>
      </Card.Header>
      <Card.Body>
        <HStack justifyContent={"space-between"}>
          <HStack gap={"1"}>
            {workoutData.map((weight, index) => {
              return (
                <VStack>
                  <HStack>
                    <Center w={"100px"}>
                      <Text>Reps</Text>
                    </Center>
                    <Field.Root>
                      <NumberInput.Root value={weight.reps.toString()} min={0} onValueChange={(e) => handleChange(e, e.value, "reps", index)}>
                        <NumberInput.Control />
                        <NumberInput.Input colorPalette={"teal"} name="reps"/>
                      </NumberInput.Root>
                    </Field.Root>
                  </HStack>
                  <HStack>
                    <Center w={"100px"}>
                      <Text>Weight</Text>
                    </Center>
                    <Field.Root>
                      <NumberInput.Root value={weight.weight.toString()} formatOptions={{style: "unit", unit: "pound"}} min={0} onValueChange={(e) => handleChange(e, e.value, "weight", index)}>
                          <HStack>
                            <NumberInput.Control />
                            <NumberInput.Input colorPalette={"teal"} name="weight" />
                          </HStack>
                      </NumberInput.Root>
                    </Field.Root>
                  </HStack>
                </VStack>
              )
            })}

          </HStack>
          <VStack>
            <HStack justifyContent={"center"}>
              <Field.Root>
                <Button w={"100px"} onClick={handleAddInput}>
                  Add Set
                </Button>
              </Field.Root>
              <Field.Root>
                <Button w={"100px"} onClick={handleDeleteInput}>
                  Delete Set
                </Button>
              </Field.Root>
            </HStack>
            <HStack justifyContent={"center"}>
              <Field.Root>
                <IconButton colorPalette={"red"} bgColor={variant.buttonColorDown} onClick={handleMoveDown}>
                  <MdOutlineKeyboardArrowDown />
                </IconButton>
              </Field.Root>
              <Field.Root>
                <IconButton colorPalette={"teal"} bgColor={variant.buttonColorUp} onClick={handleMoveUp}>
                <MdOutlineKeyboardArrowUp />
                </IconButton>
              </Field.Root>
            </HStack>
          </VStack>
        </HStack>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
      </Card.Footer>
    </Card.Root>
  )
}

export default RepCard;