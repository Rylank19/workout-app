import { Exercise } from "@/store/exercise";
import { Button, Card, Field, HStack, NumberInput, VStack, Text, Center, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";

const RepCard = ({exercise, moveElementUp, moveElementDown, clicked, setCurrentElement} : {exercise: Exercise, moveElementUp: () => void, moveElementDown: () => void, clicked : boolean, setCurrentElement : () => void }) => {
  const [weights, setWeights] = useState([{reps: "8", weight: "0"}])
  console.log("Rerendered" + exercise.name + "Clicked = " + clicked)

  const handleChange = (value: string, field : string, index : number) => {
    // is a deep copy necessary?
    const array = [...weights]; // get the current stored values
    array[index][field] = value; // change the value that caused the handleChange to run
    setWeights(array) // set the state to the new weights
  }

  const handleAddInput = () => {
    setWeights([...weights, {reps: "8", weight: "0"}]); // add a new set with a default of 8 reps
  }

  const handleDeleteInput = () => {
    const newArray = [...weights]; // get the weight values
    newArray.pop();
    setWeights(newArray);
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
    borderWidth:"",
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
            {weights.map((weight, index) => {
              return (
                <VStack>
                  <HStack>
                    <Center w={"100px"}>
                      <Text>Reps</Text>
                    </Center>
                    <Field.Root>
                      <NumberInput.Root value={weight.reps} min={0} onValueChange={(e) => handleChange(e.value, "reps", index)}>
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
                      <NumberInput.Root value={weight.weight} formatOptions={{style: "unit", unit: "pound"}} min={0} onValueChange={(e) => handleChange(e.value, "weight", index)}>
                          <HStack>
                            <NumberInput.Input colorPalette={"teal"} name="weight" />
                            <NumberInput.Control />
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