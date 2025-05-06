import { Button, Center, CloseButton, Dialog, Link, LinkOverlay, Portal, SimpleGrid, Steps, createOverlay } from "@chakra-ui/react"

export interface DialogProps {
  title?: string
  content?: React.ReactNode
  step: number,
  readonly setter?: React.Dispatch<React.SetStateAction<number>>
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, content, step, setter, ...rest } = props
  const incrementStep = () => {
    if (step + 1 > 3)
      setter(3)
    else
      setter(step + 1)
  }
  
  const decrementStep = () => {
    if (step - 1 < 0)
      setter(0)
    else
      setter(step - 1)
  }
  
  const resetStep = () => {
    setter(0)
  }

  return (
    <Dialog.Root {...rest}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content minW={"800px"}>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {content}
          </Dialog.Body>
          <Dialog.Footer>
            <Button variant="outline" onClick={decrementStep}>Back</Button>
            {step === 3 && 
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="blue"
                  onClick={resetStep}
                  >Finish</Button>
              </Dialog.ActionTrigger>
            }
            {step !== 3 && <Button
              colorPalette="blue"
              onClick={incrementStep}
              >
              Next
            </Button>}
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton />
          </Dialog.CloseTrigger>
          {/* Add steps down here for workout creation */}
          <Center p={5}>
            <Steps.Root step={step} count={3} >
              <Steps.List>
                <Steps.Item index={0} title={"Choose Exercises"}>
                  <Steps.Indicator />
                  <Steps.Title>{"Choose Exercises"}</Steps.Title>
                  <Steps.Separator />
                </Steps.Item>
                <Steps.Item index={1} title={"Set Reps and Weights"}>
                  <Steps.Indicator />
                  <Steps.Title>{"Set Reps and Weights"}</Steps.Title>
                  <Steps.Separator />
                </Steps.Item>
                <Steps.Item index={2} title={"Review Exercises"}>
                  <Steps.Indicator />
                  <Steps.Title>{"Review Exercises"}</Steps.Title>
                  <Steps.Separator />
                </Steps.Item>
              </Steps.List>
              <Steps.CompletedContent>All steps are complete!</Steps.CompletedContent>
            </Steps.Root>
          </Center>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
  )
})