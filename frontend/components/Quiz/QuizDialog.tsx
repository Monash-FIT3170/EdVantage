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
import {useRef} from "react";

// export default function App() {
//     const {isOpen, onOpen, onClose} = useDisclosure();

//     return (
//         <>
//             <Button colorScheme="blue" onClick={onOpen}>Click on me!</Button>
//             <Dialog isOpen={isOpen} onClose={onClose}/>
//         </>
//     );
// }

export default function QuizDialog() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    return (
        <>
            <Button onClick={onOpen} colorScheme="blue">Quiz</Button>
            <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Alert!
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            This is an alert!
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>No!</Button>
                            <Button colorScheme="blue" onClick={onClose}>Yes!</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}