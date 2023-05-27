import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import {useRef, FC} from "react";

interface QuizDialogProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default function QuizDialog({isOpen , onOpen, onClose}: QuizDialogProps) {
    // const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef();

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">Quiz</Button>
            <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Open Quiz
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to open the quiz?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>No</Button>
                            <Button colorScheme="blue" onClick={onClose}>Yes</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}