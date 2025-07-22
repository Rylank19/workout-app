import { Dialog, Portal, createOverlay } from "@chakra-ui/react"
import { JSX } from "react"

export interface DialogProps {
  title?: string
  content: () => JSX.Element
  handleOpenChange?: () => void
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, content, handleOpenChange, ...rest } = props

  console.log("dialog happening twice")
  return (
    <Dialog.Root {...rest} onOpenChange={handleOpenChange}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content minW={"800px"}>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          {content()}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
  );
})