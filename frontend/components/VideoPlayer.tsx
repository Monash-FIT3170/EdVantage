import { Box } from '@chakra-ui/react';
import React, { Ref } from 'react';


type VideoPlayerProps = {
  link: string;
  vttLink?: string;  // Optional subtitle link
  videoRef: Ref<HTMLVideoElement>;
};

const VideoPlayer = ({ link, vttLink, videoRef }: VideoPlayerProps) => {
  return (
    <Box className="player-container" borderRadius={'lg'}>
      <video controls preload="metadata" ref={videoRef} crossOrigin="anonymous" style={{ width: '100%' }}>
        <source src={link} type="video/mp4" />
        <track kind="subtitles" src={vttLink} srcLang="en" label="English" />
      </video>
    </Box>
  );
};

export default VideoPlayer;
