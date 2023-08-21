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
    Spinner, Stack, Card, CardHeader, Heading, CardBody,
} from "@chakra-ui/react";
import Timestamp from "react-timestamp";
import ApiClient from "@/utils/api-client";

interface QuizResultDrawerProps {
    drawerState: boolean;
    closeDrawer: () => void;
    fetchData: any;
    attemptData: any;
}

const QuizAttemptDrawer = ({ drawerState, closeDrawer, fetchData, attemptData }: QuizResultDrawerProps) => {
    const [questionData, setQuestionData] = useState<any>(null);
    const [attempt, setAttempt] = useState<any>(null);

    const [isLoading, setLoading] = useState(false);

    const btnRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        fetchData(attemptData);
        setAttempt(attemptData);
        const apiClient = new ApiClient();
        apiClient
            .get(`quiz/attempt/${attemptData.attempt_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchData(data);
                setQuestionData(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
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
                            {attempt && (
                                <DrawerHeader style={{fontWeight: "normal"}}>
                                    <Text style={{fontWeight: "bold"}}>{attempt.title}</Text>
                                    <Timestamp date={attemptData.timestamp}/>
                                </DrawerHeader>)}
                            {questionData && (<DrawerBody>
                                <Text>Score: {Math.round(attempt.percentage * 100) / 100}%</Text>
                                <Stack spacing='4'>
                                    {questionData.map((question: any, i: number) => (
                                        <Card key={question.result_id} variant='elevated' style={{color: question.result ? '#008000bd' : '#e42b2bcc'}}>
                                            <CardHeader>
                                                <Heading size='md'>{i+1}. {question.question}</Heading>
                                            </CardHeader>
                                            <CardBody style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={{textAlign: 'left'}}>Your Answer: {question.user_answer}</Text>
                                                <Text title={`All Answers: ${question.array_agg.toString()}`} style={{textAlign: 'left'}}>Correct Answer: {question.array_agg[0]} (?)</Text>
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
            </Drawer>
        </>
    )
}

export default QuizAttemptDrawer;