import ProtectedRoute from '@/components/ProtectedRoute';
import UnitCard from '@/components/VideoCard';
import { AllRoles } from '@/utils/types';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FiBookOpen, FiLink, FiMail } from 'react-icons/fi';
import ApiClient from "@/utils/api-client";
import {useState} from "react";

const units = {
  FIT3170: {
    name: 'Software engineering practice',
    videos: [
      { heading: 'Agile Development Overview', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-Agile-Development-Overview.png' },
      { heading: 'Semester 1 Week 8 Lecture UI/UX', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W8-Lecture-UI-UX.jpg' },
      { heading: 'Semester 1 Week 10 Lecture Financial Consulting', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W10-Lecture-Financial-Consulting.jpg' },
      { heading: 'Semester 1 Week 12 Group Presentations', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3170-W12-Group-Presentations.jpg' },
    ],
  },
  FIT3077: {
    name: 'Software engineering: Architecture and design',
    videos: [
      { heading: 'Design Patterns: A Deep Dive', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-Design-Patterns.jpg' },
      { heading: 'Microservices Architecture', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-microservices-architecture.png' },
      { heading: 'RESTful API Design', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-RESTful-API-Design.jpg' },
      { heading: 'Frontend Architecture: MVC and MVVM', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3077-MVC-vs-MVP-vs-MVVM.jpg' },
    ],
  },
  FIT3159: {
    name: 'Computer architecture',
    videos: [
      { heading: 'Magnetic Disk Lecture', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Hardware-Software-optimization-process.png' },
      { heading: 'Devices, Counters, Adders, Shifters, Sequential Logic', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Devices-Counters-Adders-Shifters-Sequential+Logic.jpg' },
      { heading: 'Concurrency and Parallelism', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-concurrency-parallelism.jpg' },
      { heading: 'Instruction Sets and Instruction Set Design', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3159-Instruction-Sets-Instruction-Set-Design.jpg' },
    ],
  },
  FIT3178: {
    name: 'iOS app development',
    videos: [
      { heading: 'iOS Application Architecture', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-ios-application-architecture.jpg' },
      { heading: 'Data Persistence', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-data-persistence.png' },
      { heading: 'Firebase Cloud Platform', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-firebase-cloud-platform.jpg' },
      { heading: 'Maps and Geolocation', thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/FIT3178-maps-geolocation.jpg' },
    ],
  },
}

const UnitPage: NextPage = () => {
  const router = useRouter();
  const {unitId} = router.query;
  const [vidState, setVidState] = useState(0)

  const unitData = unitId ? units[unitId as keyof typeof units] : units.FIT3178;

  const getVideo = (): void => {
    const apiClient = new ApiClient();
    apiClient
        .get(`video`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length != 0 && vidState < 1) {
            unitData.videos.push({heading: data[0].title, thumbnail: 'https://dkkxc50nup77a.cloudfront.net/thumbnails/demo_thumbnail.png'})
            setVidState(2);
          }
        })
        .catch((err) => console.error(err));
  }

  if (unitId == 'FIT3170') {
    getVideo();
  }

  return (
      <ProtectedRoute allowedRoles={AllRoles}>
        <Container maxW={'container.xl'} mt={6} centerContent>
          <Stack
              maxH={'sm'}
              w={'full'}
              p={{base: 3, lg: 6}}
              spacing={3}
              alignItems={'center'}
          >
            <Heading as="h1" fontSize={{base: '5xl', lg: '6xl'}}>
              {unitId?.toString().toUpperCase()}
            </Heading>
            <Text fontSize={'larger'}>
              {unitData.name}
            </Text>

            <ButtonGroup size={{base: 'sm', lg: 'md'}}>
              <Button variant={'ghost'} leftIcon={<FiMail/>}>
                Unit Email
              </Button>
              <Button variant={'ghost'} leftIcon={<FiLink/>}>
                Moodle
              </Button>
              <Button variant={'ghost'} leftIcon={<FiBookOpen/>}>
                Assessments
              </Button>
            </ButtonGroup>

            <Divider/>
          </Stack>
          <Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={6}>
            {unitData.videos.map(({heading, thumbnail}) => (
                <UnitCard key={heading} heading={heading} thumbnail={thumbnail}/>
            ))}
          </Flex>
        </Container>
      </ProtectedRoute>
  );
};

export default UnitPage;
