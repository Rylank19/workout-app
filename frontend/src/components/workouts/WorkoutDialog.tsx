import { Button, Center, CloseButton, Dialog, Link, LinkOverlay, Portal, SimpleGrid, Steps, createOverlay } from "@chakra-ui/react"
import { JSX, useMemo, useState } from "react"

export interface DialogProps {
  title?: string
  content: () => JSX.Element
}

export const dialog = createOverlay<DialogProps>((props) => {
  const { title, content, ...rest } = props

  console.log("dialog happening twice")
  return (
    <Dialog.Root {...rest}>
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