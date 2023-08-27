import { Box, Image } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import type { MediaSource } from '@/utils/types';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

type MediaCarouselProps = {
  images: MediaSource[];
};

export default function MediaCarousel({ images }: MediaCarouselProps) {
  return (
    <Box>
      <Carousel
        className="carousel-container"
        responsive={responsive}
        draggable
        keyBoardControl
        ssr
      >
        {images.map(({ src, alt }) => (
          <Image
            key={src}
            src={src}
            alt={alt}
            width={'100%'}
            height={'auto'}
            objectFit={'contain'}
          />
        ))}
      </Carousel>
    </Box>
  );
}
