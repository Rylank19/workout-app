import { Dialog, Portal, createOverlay } from "@chakra-ui/react"

interface DialogProps {
  title: string
  description?: string
  content?: React.ReactNode
  handleOpenChange?: () => void
}


const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, handleOpenChange, ...rest } = props

  return (
    <Dialog.Root {...rest} onOpenChange={handleOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title>{title}</Dialog.Title>
              </Dialog.Header>
            )}
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              {content}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})

export default dialog;