import { Box, Card, CardBody, Stack, Heading } from '@chakra-ui/react';
import MediaCarousel from './Carousel/MediaCarousel';
import type { MediaSource } from '@/utils/types';
import Upload from './Uploads/Upload'; // Import the Upload component
import DeleteComponent from './Uploads/Deletion';
import ListFilesComponent from './Uploads/Retrieval';


type MediaPaneProps = {
  title: string;
  type: 'image' | 'video' | 'file';
  media: MediaSource[];
};

const MediaPane = ({ title, type, media }: MediaPaneProps) => {
  return (
    <Box maxW={'2xl'}>
      <Card variant={'outline'}>
        <CardBody>
          {type === 'image' ? <MediaCarousel images={media} /> : ''}
          <Stack mt="6" spacing="3">
            <Heading size="lg">{title}</Heading>
          </Stack>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Upload/>
        </CardBody>
      </Card>
    </Box>
  );
};

export default MediaPane;
