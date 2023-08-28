import { Box } from '@chakra-ui/react';

type VideoPlayerProps = {
  link: string;
  vttLink?: string;  // Optional subtitle link
};

const VideoPlayer = ({ link, vttLink }: VideoPlayerProps) => {
  return (
    <Box className="player-container" borderRadius={'lg'}>
      <video controls preload="metadata" crossOrigin="anonymous" style={{ width: '100%' }}>
        <source src={link} type="video/mp4" />
        {vttLink && (
          <track kind="subtitles" src={vttLink} srcLang="en" label="English" />
        )}
      </video>
    </Box>
  );
};

export default VideoPlayer;
