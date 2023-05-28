import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    ButtonGroup
} from "@chakra-ui/react";
import { useRef } from "react";

interface QuizSubmitDialogProps {
    dialogState: boolean;
    closeDialog: () => void;
    closeDrawer: () => void;
}

export default function QuizSubmitDialog({ dialogState, closeDialog, closeDrawer }: QuizSubmitDialogProps) {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <AlertDialog isOpen={dialogState} onClose={closeDialog} leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Submit Quiz
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want submit the quiz?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup spacing={1}>
                                <Button ref={cancelRef} onClick={closeDialog}>No</Button>
                                <Button colorScheme="blue" onClick={() => { closeDialog(); closeDrawer(); }}>Yes</Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}