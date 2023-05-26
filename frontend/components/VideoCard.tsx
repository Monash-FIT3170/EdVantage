import { AspectRatio, Badge, Box, Heading, Image } from '@chakra-ui/react';

type VideoCardProps = {
  heading: string;
};

const VideoCard = ({ heading }: VideoCardProps) => {
  return (
    <Box maxW={'sm'} borderWidth={'1px'} borderRadius={'lg'}>
      <AspectRatio ratio={16 / 9}>
        <Image
          src={
            'https://images.unsplash.com/photo-1684581789611-0e2f91826b46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80'
          }
          alt={'Futuristic architecture design'}
        />
      </AspectRatio>
      <Box p={6}>
        <Badge borderRadius={'full'} colorScheme="purple" px={2}>
          New
        </Badge>

        <Heading
          fontSize={'md'}
          fontWeight={'semibold'}
          lineHeight={'tight'}
          noOfLines={1}
        >
          {heading}
        </Heading>
      </Box>
    </Box>
  );
};

export default VideoCard;
