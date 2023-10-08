import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AllRoles } from "@/utils/types";
import { Button, ButtonGroup, Container, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { FiBookOpen, FiLink, FiMail } from "react-icons/fi";
import UnitCard from "@/components/UnitCard";
import { AuthContext } from "@/components/AuthProvider";
import { useContext, useState } from "react";
import QuizDrawer from "@/components/Quiz/QuizDrawer";
import Link from "next/link";
import { useUser } from "@/components/UserProvider";

const units = [
  {
    name: 'Software engineering practice',
    unit: 'FIT3170',
    videos: [
      {
        heading: 'Agile Development Overview',
        thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-Agile-Development-Overview.png'
      },
      {
        heading: 'Semester 1 Week 8 Lecture UI/UX',
        thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W8-Lecture-UI-UX.jpg'
      },
      {
        heading: 'Semester 1 Week 10 Lecture Financial Consulting',
        thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W10-Lecture-Financial-Consulting.jpg'
      },
      {
        heading: 'Semester 1 Week 12 Group Presentations',
        thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W12-Group-Presentations.jpg'
      },
    ],
    thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-Agile-Development-Overview.png'
  },
  {
    name: 'Software engineering: Architecture and design',
    unit: 'FIT3077',
    videos: [
      { heading: 'Design Patterns: A Deep Dive', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-Design-Patterns.jpg' },
      { heading: 'Microservices Architecture', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-microservices-architecture.png' },
      { heading: 'RESTful API Design', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-RESTful-API-Design.jpg' },
      { heading: 'Frontend Architecture: MVC and MVVM', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-MVC-vs-MVP-vs-MVVM.jpg' },
    ],
    thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-Design-Patterns.jpg'
  },
  {
    name: 'Computer architecture',
    unit: 'FIT3159',
    videos: [
      { heading: 'Devices, Counters, Adders, Shifters, Sequential Logic', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Devices-Counters-Adders-Shifters-Sequential+Logic.jpg' },
      { heading: 'Concurrency and Parallelism', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-concurrency-parallelism.jpg' },
      { heading: 'Instruction Sets and Instruction Set Design', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Instruction-Sets-Instruction-Set-Design.jpg' },
      { heading: 'Optimizing Code for Hardware', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Hardware-Software-optimization-process.png' },
    ],
    thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Devices-Counters-Adders-Shifters-Sequential+Logic.jpg'
  },
  {
    name: 'iOS app development',
    unit: 'FIT3178',
    videos: [
      { heading: 'iOS Application Architecture', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-ios-application-architecture.jpg' },
      { heading: 'Data Persistence', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-data-persistence.png' },
      { heading: 'Firebase Cloud Platform', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-firebase-cloud-platform.jpg' },
      { heading: 'Maps and Geolocation', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-maps-geolocation.jpg' },
    ],
    thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-ios-application-architecture.jpg'
  },
]

const WelcomePage = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { units } = useUser()

  const [drawerState, setDrawerState] = useState(false);
  function openDrawer() { setDrawerState(true); }
  function closeDrawer() { setDrawerState(false); }
  function openSubmitDialog() { }

  return (
    <ProtectedRoute allowedRoles={AllRoles}>
      <Container maxW={'container.xl'} mt={6} centerContent>
        <Stack
          maxH={'sm'}
          w={'full'}
          p={{ base: 3, lg: 6 }}
          spacing={3}
          alignItems={'center'}
        >
          <Heading as="h1" fontSize={{ base: '5xl', lg: '6xl' }}>
            Welcome, {auth?.user?.name}
          </Heading>
          <Text fontSize={'larger'}>
            Select one of your units
          </Text>

          <ButtonGroup size={{ base: 'sm', lg: 'md' }}>
            <a href={"https://lms.monash.edu/my/"} target={'_blank'}>
              <Button variant={'ghost'} leftIcon={<FiLink />} >
                Moodle
              </Button>
            </a>
            <Button variant={'ghost'} leftIcon={<FiBookOpen />} onClick={openDrawer}>
              Assessments
            </Button>
          </ButtonGroup>

          <QuizDrawer id={'1'} drawerState={drawerState} closeDrawer={closeDrawer} openDialog={openSubmitDialog} />

          <Divider />
        </Stack>
        <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={6}>
          {!!units ?
            units.length == 0 ?
              <Text fontSize={'larger'}>
                Not enrolled
              </Text>
              :
              units.map(({ unitName, unitCode }) => (
                <a key={unitCode} href={'http://localhost:3000/unit/' + unitCode} >
                  <UnitCard key={unitCode} heading={unitCode + ": " + unitName} thumbnail={''} unit={unitCode} />
                </a>
              )) :
            <Text fontSize={'larger'}>
              Loading units...
            </Text>
          }
        </Flex>
      </Container>
    </ProtectedRoute>
  );
};

export default WelcomePage;
