import React from "react";

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { deleteConfirmationDialog } from "../../types/props";

function DeleteConfirmationDialog(props: deleteConfirmationDialog) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.dialogHeader}
            </AlertDialogHeader>

            <AlertDialogBody>{props.dialogSubheader}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={props.onClose}>
                Cancel
              </Button>
              <Button
                ml={3}
                colorScheme="red"
                onClick={props.onClick}
                isLoading={props.isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default DeleteConfirmationDialog;
