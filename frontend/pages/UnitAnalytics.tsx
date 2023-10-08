import {
    Button,
    Container,
    Heading,
    Stack,
    Text,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Link,
    Flex,
    Box,
    Spacer,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import AudioHeatmap from '@/components/VideoHeatmap';

Chart.register(...registerables)

// Fake data

const units = ["FIT3170", "FIT3077", "FIT3159", "FIT3178"];

const videoAnalyticsData = [
    {
        videoTitle: "Intro to Algebra",
        author: "Stevie Wonder",
        uploadDate: "2021-01-01",
        pieData: {
            labels: ['Finished', 'Attempted', 'Not Attempted'],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        barData: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: '',
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
                hoverBackgroundColor: '#36A2EB',
                hoverBorderColor: '#36A2EB',
                data: [800, 500, 400, 600, 300]
            }]
        },
        barResultData: {
            labels: ['0-50', '50-60', '60-70', '80-100'],
            datasets: [{
                label: '',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                hoverBackgroundColor: '#FF6384',
                hoverBorderColor: '#FF6384',
                data: [5, 15, 20, 30, 30]
            }]
        }
    },
    {
        videoTitle: "Advanced Calculus",
        author: "Tom Brady",
        uploadDate: "2020-12-15",
        pieData: {
            labels: ['Finished', 'Attempted', 'Not Attempted'],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
            }]
        },
        barData: {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: '',
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
                hoverBackgroundColor: '#36A2EB',
                hoverBorderColor: '#36A2EB',
                data: [65, 59, 80, 81, 56]
            }]
        },
        barResultData: {
            labels: ['0-50', '50-60', '60-70', '80-100'],
            datasets: [{
                label: '',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                hoverBackgroundColor: '#FF6384',
                hoverBorderColor: '#FF6384',
                data: [5, 15, 20, 30, 30]
            }]
        }
    }
];

const enrolmentData = [
  { firstName: "John", lastName: "Doe", email: "tthi0007@student.monash.edu" },
  { firstName: "Isaac", lastName: "Smith", email: "ismi0009@student.monash.edu" },
  { firstName: "Katie", lastName: "Yin", email: "kyin0004@student.monash.edu" },
  { firstName: "John", lastName: "Kennedy", email: "jken0004@student.monash.edu" },
];

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: '',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        data: [65, 59, 80, 81, 56]
    }]
};

// Page

const UnitAnalytics: NextPage = () => {

    const router = useRouter();

    const videoModal = useDisclosure();
    const studentModal = useDisclosure();

    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);

    return (
        <Container maxW={'container.xl'} mt={6} centerContent>
            <Stack spacing={3} alignItems={'center'}>
                <Heading fontSize='5xl'>Unit Analytics</Heading>

                <Spacer/>

                <Select
                    placeholder="Select unit"
                    value={selectedUnit || undefined}
                    onChange={(e) => setSelectedUnit(e.target.value)}  // Update state on selection change
                >
                    {units.map((unit, index) => (
                        <option key={index} value={unit}>
                        {unit}
                        </option>
                    ))}
                </Select>

                <Spacer/>

                {selectedUnit && (
                    <>
                        <Heading fontSize='3xl'>Videos</Heading>

                        <Box width="100%" maxHeight="420px" overflowY="scroll">
                            <Table variant="simple" size="md">

                                <Thead>
                                    <Tr>
                                        <Th>Video Title</Th>
                                        <Th>Author</Th>
                                        <Th>Upload Date</Th>
                                        <Th>Info</Th>
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {videoAnalyticsData.map((video, index) => (
                                        <Tr key={index}>
                                        <Td>{video.videoTitle}</Td>
                                        <Td>{video.author}</Td>
                                        <Td>{video.uploadDate}</Td>
                                        <Td>
                                            <Button onClick={() => {
                                                setSelectedVideo(video);
                                                videoModal.onOpen();
                                            }}>
                                                Get
                                            </Button>
                                        </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>

                        <Spacer/>

                        <Heading fontSize='3xl'>Overall</Heading>

                            <Box m={4} width={['100%', '45%']} height={["200px", "400px"]}>
                                <Bar
                                    data={barData}
                                    options={{
                                        maintainAspectRatio: false,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: 'Quiz Participation Rate',
                                                font: {
                                                    size: 20
                                                }
                                            }
                                        },
                                        scales: {
                                            y: {
                                                ticks: {
                                                    callback: function(value, index, values) {
                                                        return value + '%';
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Box>

                        <Spacer/>

                        <Heading fontSize='3xl'>Enrolment</Heading>

                        <Box width="100%" maxHeight="420px" overflowY="scroll">
                            <Table variant="simple" size="md">
                                <Thead>
                                    <Tr>
                                    <Th>First Name</Th>
                                    <Th>Last Name</Th>
                                    <Th>Email</Th>
                                    <Th>Info</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {enrolmentData.map((student, index) => (
                                    <Tr key={index}>
                                    <Td>{student.firstName}</Td>
                                    <Td>{student.lastName}</Td>
                                    <Td>{student.email}</Td>
                                    <Td>
                                        <Button onClick={() => {
                                            setSelectedStudent(student);
                                            studentModal.onOpen();
                                        }}>
                                            Get
                                        </Button>
                                    </Td>
                                    </Tr>
                                ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </>
                )}

            </Stack>

            {selectedVideo && (
                <Modal size="3xl" isOpen={videoModal.isOpen} onClose={videoModal.onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody overflowY="auto">
                            <center>
                                <Heading>{selectedVideo.videoTitle}</Heading>
                            </center>

                            <center>
                                <Box m={4} width={['100%', '45%']} height={["200px", "400px"]}>
                                    <Pie
                                        data={selectedVideo.pieData}
                                        options={{
                                            maintainAspectRatio: false,
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Quiz Participation',
                                                    font: {
                                                        size: 20
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </Box>

                                <Box m={4} width={['100%', '45%']} height={["200px", "400px"]}>
                                    <Bar
                                        data={selectedVideo.barResultData}
                                        options={{
                                            maintainAspectRatio: false,
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Quiz Results',
                                                    font: {
                                                        size: 20
                                                    }
                                                }
                                            },
                                        }}
                                    />
                                </Box>

                                <Box m={4} width={['100%', '45%']} height={["200px", "400px"]}>
                                    <Bar
                                        data={selectedVideo.barData}
                                        options={{
                                            maintainAspectRatio: false,
                                            plugins: {
                                                title: {
                                                    display: true,
                                                    text: 'Viewers',
                                                    font: {
                                                        size: 20
                                                    }
                                                }
                                            },
                                        }}
                                    />
                                </Box>

                                <Box>
                                    <AudioHeatmap/>
                                </Box>


                            </center>

                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={videoModal.onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

        </Container>
    );
};

export default UnitAnalytics;