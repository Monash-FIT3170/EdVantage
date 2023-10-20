import {
    Button,
    Container,
    Flex,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Select,
    useDisclosure,
    Stack
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import AddPersonModal from '@/components/AddPerson';

const units = ["Unit A", "Unit B", "Unit C", "Unit D"];

const data = [
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
    { firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Student' },
];
  
const UnitAdministration: NextPage = () => {
    
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const handleAddPerson = (data: any) => {
      console.log(data);
    };
  
    return (
        <Container maxW={'container.xl'} mt={6} centerContent>
            <Stack spacing={3} alignItems={'center'}>
                <Heading as="h1" fontSize={{ base: '5xl', lg: '6xl' }}>Unit Administration</Heading>

                <Select placeholder="Select unit">
                    {units.map((unit, index) => (
                        <option key={index} value={unit}>
                        {unit}
                        </option>
                    ))}
                </Select>
    
                <Box width="100%" maxHeight="420px" overflowY="scroll">
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th>First Name</Th>
                                <Th>Last Name</Th>
                                <Th>Email</Th>
                                <Th>Role</Th>
                                <Th>Edit</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((person) => (
                                <Tr key={person.email}>
                                    <Td>{person.firstName}</Td>
                                    <Td>{person.lastName}</Td>
                                    <Td>{person.email}</Td>
                                    <Td>{person.role}</Td>
                                    <Td>
                                        <Button colorScheme="blue" onClick={() => {/* Edit page */}}>Edit</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
    
                <Flex mt={4}>
                    <Button colorScheme="green" onClick={onOpen}>Add New Person</Button>
                </Flex>
            </Stack>
  
            <AddPersonModal isOpen={isOpen} onClose={onClose} onSubmit={handleAddPerson} />

        </Container>
    );
};

export default UnitAdministration;