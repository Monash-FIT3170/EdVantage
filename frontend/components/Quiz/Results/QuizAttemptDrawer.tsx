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
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    Spinner, Stack, Card, CardHeader, Heading, CardBody, useDisclosure,
} from "@chakra-ui/react";
import Timestamp from "react-timestamp";
import ApiClient from "@/utils/api-client";
import OpenAI from "openai";
import ChatGptUtils from "@/utils/ChatGptUtils";

interface QuizResultDrawerProps {
    drawerState: boolean;
    closeDrawer: () => void;
    fetchData: any;
    attemptData: any;
}

const QuizAttemptDrawer = ({ drawerState, closeDrawer, fetchData, attemptData }: QuizResultDrawerProps) => {
    const [questionData, setQuestionData] = useState<any>(null);
    const [popupData, setPopupData] = useState<any>(null);
    const [attempt, setAttempt] = useState<any>(null);

    const [isLoading, setLoading] = useState(false);
    const [isPopupLoading, setPopupLoading] = useState(false);

    const btnRef = useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true // Long-term, ensure secret credentials are not exposed with this method
    });

    useEffect(() => {
        setLoading(true);
        fetchData(attemptData);
        setAttempt(attemptData);
        const apiClient = new ApiClient();
        apiClient
            .get(`quiz/attempt/${attemptData.attempt_id}`)
            .then((res) => res.json())
            .then((data) => {
                fetchData(data);
                setQuestionData(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
        }, [])

    const getChatGptHelp = async (value: any): Promise<void> => {
        setPopupLoading(true);
        setPopupData("");
        onOpen();
        const chatGptUtils = new ChatGptUtils();
        const requestBody = chatGptUtils.buildChatGptQuizRequestBody(value.question, value.user_answer)
        const completion = await openai.chat.completions.create(requestBody);
        setPopupData(completion.choices[0].message['content'])
        setPopupLoading(false);
        console.log(completion);
    }

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
                                <Text mb={2} style={{fontWeight: 'bold'}}>Click a question for AI assistance</Text>
                                <Text mb={1}>Score: {Math.round(attempt.percentage * 100) / 100}%</Text>
                                <Stack spacing='4'>
                                    {questionData.map((question: any, i: number) => (
                                        <Card
                                            key={question.result_id}
                                            variant='elevated'
                                            style={{color: question.result ? '#008000bd' : '#e42b2bcc'}}
                                            onClick={(e) => getChatGptHelp(question)}
                                            _hover={{ bg: "#e8eaed", cursor: "pointer" }}
                                            _focus={{ boxShadow: "outline" }}>
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
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    {isPopupLoading ? (
                        <ModalContent>
                            <ModalHeader>Your ChatGpt Assistant</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Your AI explanation is loading...
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    ) : (
                        <>
                        <ModalContent>
                            <ModalHeader>Your ChatGpt Assistant</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {popupData}
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' onClick={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                        </>
                    )}
                </Modal>
            </Drawer>
        </>
    )
}

export default QuizAttemptDrawer;