import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

const all_images = [
  {
    url: 'https://dkkxc50nup77a.cloudfront.net/images/fantasy_wolf.png',
    alt: 'Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground',
  },
  {
    url: 'https://dkkxc50nup77a.cloudfront.net/images/fantasy_wolf.png',
    alt: 'Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground',
  },
  {
    url: 'https://dkkxc50nup77a.cloudfront.net/images/fantasy_wolf.png',
    alt: 'Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground',
  },
];

export default function CustomCarousel() {
  return (
    <Box aspectRatio={'16 / 10'}>
      <Carousel responsive={responsive} className="carousel-container">
        {all_images.map((image) => {
          return (
            <Image
              key={image.url}
              src={image.url}
              alt={image.alt}
              width={628}
              height={396}
            ></Image>
          );
        })}
      </Carousel>
    </Box>
  );
}
