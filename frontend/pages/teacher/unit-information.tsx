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
    Box
} from '@chakra-ui/react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { BarController, BarElement} from 'chart.js';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

Chart.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
Chart.register(BarController, BarElement, CategoryScale, LinearScale);

// Fake data

const units = ["Unit A", "Unit B", "Unit C", "Unit D"];

const enrolmentData = [
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
];

const pieData = {
    labels: ['Finished', 'Attempted', 'Not Attempted'],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
};

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [{
        label: 'Data',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
        hoverBackgroundColor: '#36A2EB',
        hoverBorderColor: '#36A2EB',
        data: [65, 59, 80, 81, 56]
    }]
};

// Page

const UnitInformation: NextPage = () => {
    
    const router = useRouter();
  
    return (
        <Container maxW={'container.xl'} mt={6} centerContent>
            <Stack spacing={3} alignItems={'center'}>
                <Heading as="h1" fontSize={{ base: '5xl', lg: '6xl' }}>Unit Information</Heading>
                <Select placeholder="Select unit">
                    {units.map((unit, index) => (
                        <option key={index} value={unit}>
                        {unit}
                        </option>
                    ))}
                </Select>
                <Text fontSize={'larger'} mt={5} mb={3}>Enrolment</Text>

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
                                <Link href={`/edit/${index}`}>  {/* Info page */}
                                <Button>Get</Button>
                                </Link>
                            </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </Box>

                <Flex direction="row" justify="center" mt={5} wrap="wrap">
                    <Box m={4} width={['100%', '45%']} height={["200px", "400px"]}>
                        <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                    </Box>
                    <Box m={4} width={['100%', '45%']} height={["200px", "400px"]}>
                        <Bar data={barData} options={{ maintainAspectRatio: false }} />
                    </Box>
                </Flex>

            </Stack>
        </Container>
    );
  };
  
  export default UnitInformation;