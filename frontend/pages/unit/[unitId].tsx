import ProtectedRoute from '@/components/ProtectedRoute';
import UnitCard from '@/components/VideoCard';
import { AllRoles } from '@/utils/types';
import {
  Button,
  ButtonGroup, Center,
  Container,
  Divider,
  Flex,
  Heading, Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FiBookOpen, FiLink, FiMail } from 'react-icons/fi';
import ApiClient from "@/utils/api-client";
import React, {useEffect, useState} from "react";

const UnitPage: NextPage = () => {
  const router = useRouter();
  const {unitId} = router.query;
  const [isLoading, setLoading] = useState(true);

  const [unitData, setUnitData] = useState<any>(null);
  const [videoData, setVideoData] = useState<any>(null);

  useEffect((): void => {
    setLoading(true);
    const apiClient = new ApiClient();

    // Get unit metadata
    apiClient
        .get(`units/${unitId}`)
        .then((res) => res.json())
        .then((data) => {
          setUnitData(data[0]);
        })
        .catch((err) => console.error(err));

    // Get video metadata
    apiClient
        .get(`video/unit/${unitId}`)
        .then((res) => res.json())
        .then((data) => {
          setVideoData(data);
        })
        .catch((err) => console.error(err));

    setLoading(false);
  }, [])

  return (
      <ProtectedRoute allowedRoles={AllRoles}>
        {isLoading ? (
            <Center h="100%">
              <Spinner size={"xl"} />
            </Center>
        ) : (
            <>
              {unitData && (<Container maxW={'container.xl'} mt={6} centerContent>
                <Stack
                    maxH={'sm'}
                    w={'full'}
                    p={{base: 3, lg: 6}}
                    spacing={3}
                    alignItems={'center'}
                >
                  <Heading as="h1" fontSize={{base: '5xl', lg: '6xl'}}>
                    {unitData.unit_code}
                  </Heading>
                  <Text fontSize={'larger'}>
                    {unitData.unit_name}
                  </Text>

                  <ButtonGroup size={{base: 'sm', lg: 'md'}}>
                    <a href="mailto:example@example.com?subject=Your Subject Here" target="_blank">
                      <Button variant={'ghost'} leftIcon={<FiMail/>}>
                        Unit Email
                      </Button>
                    </a>
                    <a href={unitData.unit_moodle} target="_blank" rel="noopener noreferrer">
                      <Button variant={'ghost'} leftIcon={<FiLink/>}>
                        Moodle
                      </Button>
                    </a>
                    <Button variant={'ghost'} leftIcon={<FiBookOpen/>}>
                      Assessments
                    </Button>
                  </ButtonGroup>

                  <Divider/>
                </Stack>
                {videoData && (<Flex flexDir={'row'} flexWrap={'wrap'} justifyContent={'center'} gap={6}>
                  {videoData.map((video: any) => (
                      <UnitCard key={video.id} heading={video.title} thumbnail={video.thumbnail_link} id={video.id}/>
                  ))}
                </Flex>)}
              </Container>)}
        </>)}
      </ProtectedRoute>
  );
};

export default UnitPage;
