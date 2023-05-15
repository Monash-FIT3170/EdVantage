import { useRef } from 'react';
import {
  ButtonGroup,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  Textarea,
  Text,
  VStack,
} from '@chakra-ui/react';

const Quiz = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        variant={'solid'}
        colorScheme="blue"
      >
        Quiz
      </Button>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement={'right'}
        size={'md'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Quiz</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={'flex-start'}>
              <Text as={'b'} fontSize={'lg'}>
                1. Hey guys, Scarce here, what&apos;s up?
              </Text>
              <Textarea />
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <ButtonGroup spacing={2}>
              <Button onClick={onClose} variant={'outline'}>
                Close
              </Button>
              <Button variant={'solid'} colorScheme="blue">
                Submit
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Quiz;
