import React, {useEffect, useRef, useState} from "react";
import {
    Button, Text,
    ButtonGroup,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Spinner,
} from "@chakra-ui/react";
import Timestamp from "react-timestamp";

interface QuizResultDrawerProps {
    drawerState: boolean;
    closeDrawer: () => void;
    fetchData: any;
    attemptData: any;
}

const QuizAttemptDrawer = ({ drawerState, closeDrawer, fetchData, attemptData }: QuizResultDrawerProps) => {
    const [isLoading, setLoading] = useState(false);

    const btnRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        fetchData(attemptData);
        console.log(attemptData);
        setLoading(false);
    }, [])

    return (
        <>
            <Drawer
                isOpen={drawerState}
                onClose={closeDrawer}
                finalFocusRef={btnRef}
                placement={"left"}
                size={"md"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    {isLoading ? (
                        <Center h="100%">
                            <Spinner size={"xl"} />
                        </Center>
                    ) : (
                        <>
                            <DrawerHeader style={{fontWeight: "normal"}}>
                                <Text style={{fontWeight: "bold"}}>{attemptData.title}</Text>
                                <Timestamp date={attemptData.timestamp}/>
                            </DrawerHeader>
                            <DrawerBody>
                            </DrawerBody>
                        </>
                    )}

                    <DrawerFooter>
                        <ButtonGroup spacing={2}>
                            <Button onClick={closeDrawer} variant={"outline"}>
                                Close
                            </Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default QuizAttemptDrawer;