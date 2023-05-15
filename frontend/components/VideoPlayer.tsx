import { Box } from '@chakra-ui/react';

type VideoPlayerProps = {
  link: string;
};

const VideoPlayer = ({ link }: VideoPlayerProps) => {
  return (
    <Box className="player-container" borderRadius={'lg'}>
      <video controls preload="metadata">
        <source src={link} type="video/mp4" />
      </video>
    </Box>
  );
};

export default VideoPlayer;
