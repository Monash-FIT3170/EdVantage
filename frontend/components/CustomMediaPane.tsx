import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
} from '@chakra-ui/react';
import CustomCarousel from './Carousel/Carousel';

const CustomMediaPane = () => {
  return (
    <Box maxW={'2xl'}>
      <Card my={6} variant={'outline'}>
        <CardBody>
          <CustomCarousel></CustomCarousel>
          <Stack mt="6" spacing="3">
            <Heading size="lg">Custom Media Content</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CustomMediaPane;
