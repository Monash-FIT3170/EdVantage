import React, {useContext, useEffect, useRef, useState} from "react";
import ApiClient from "@/utils/api-client";
import {
    Button, ButtonGroup, Card, CardBody, CardHeader, Text,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay, Heading,
    Spinner, Stack
} from "@chakra-ui/react";
import Timestamp from "react-timestamp";
import QuizAttemptDrawer from "@/components/Quiz/Results/QuizAttemptDrawer";
import {AuthContext} from "@/components/AuthProvider";


interface QuizResultDrawerProps {
    drawerState: boolean;
    closeDrawer: () => void;
    fetchData: any;
}

const QuizResultDrawer = ({ drawerState, closeDrawer, fetchData }: QuizResultDrawerProps) => {
    const [attempts, setAttempts] = useState<any>(null);

    const [isLoading, setLoading] = useState(false);

    const btnRef = useRef(null);
    const auth = useContext(AuthContext);

    const [isAttemptOpen, setIsAttemptOpen] = useState(false);
    const [attemptData, setAttemptData] = useState<any>(null);
    function openAttemptDrawer(attemptId: any) {
        setAttemptData(attemptId);
        setIsAttemptOpen(true);
    }
    function closeAttemptDrawer() { setIsAttemptOpen(false); }

    useEffect(() => {
        setLoading(true);
        const apiClient = new ApiClient();
        apiClient
            .get(`quiz/results/${auth?.user?.userId}`)
            .then((res) => res.json())
            .then((data) => {
                fetchData(data);
                setAttempts(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, []);

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
                            <DrawerHeader as={"b"} fontSize={"xl"}>
                                Your Results
                            </DrawerHeader>
                            {attempts && (<DrawerBody>
                                <Stack spacing='4'>
                                    {attempts.map((attempt: any) => (
                                        <Card
                                            key={attempt.attempt_id}
                                            variant='elevated'
                                            onClick={() => openAttemptDrawer(attempt)}
                                            _hover={{ bg: "#e8eaed", cursor: "pointer" }}
                                            _focus={{ boxShadow: "outline" }}
                                        >
                                            <CardHeader>
                                                <Heading size='md'> {attempt.title}</Heading>
                                            </CardHeader>
                                            <CardBody style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{textAlign: 'left'}}>Score: {Math.round(attempt.percentage * 100) / 100}%</Text>
                                                <Timestamp style={{fontWeight: "bold", textAlign: 'right'}} date={attempt.timestamp}></Timestamp>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </Stack>
                            </DrawerBody>)}
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

                {isAttemptOpen && (
                    <QuizAttemptDrawer
                        drawerState={isAttemptOpen}
                        closeDrawer={closeAttemptDrawer}
                        fetchData={setAttemptData}
                        attemptData={attemptData}
                    />
                )}
            </Drawer>
        </>
    );
};

export default QuizResultDrawer;