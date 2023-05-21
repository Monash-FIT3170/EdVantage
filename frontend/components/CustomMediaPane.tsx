import { Box, Card, CardBody, Stack, Heading } from '@chakra-ui/react';
import CustomCarousel from './Carousel/Carousel';

const CustomMediaPane = () => {
  return (
    <Box maxW={'2xl'}>
      <Card variant={'outline'}>
        <CardBody>
          <CustomCarousel />
          <Stack mt="6" spacing="3">
            <Heading size="lg">Custom Carousel</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CustomMediaPane;
