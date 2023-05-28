import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    ButtonGroup,
    useDisclosure
} from "@chakra-ui/react";
import { useRef, useState } from "react";

interface QuizDialogProps {
    dialogState: boolean;
    closeDialog: () => void;
    openDrawer: () => void;
}

export default function QuizDialog({ dialogState, closeDialog, openDrawer }: QuizDialogProps) {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <AlertDialog isOpen={dialogState} onClose={closeDialog} leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Open Quiz
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to open the quiz?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ButtonGroup spacing={1}>
                                <Button ref={cancelRef} onClick={closeDialog}>No</Button>
                                <Button colorScheme="blue" onClick={() => { closeDialog(); openDrawer(); }}>Yes</Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}