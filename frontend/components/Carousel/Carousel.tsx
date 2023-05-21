import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
    Box,
    Card,
    Image
  } from '@chakra-ui/react';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
export default function CustomCarousel() {
  return (
    <Box>
        <Card>
            <Carousel responsive={responsive} className='carousel-container'>
                <Image src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/053bae63-7a8e-416f-b3e9-d65a7f485fce/dfqm6w0-54eca1b4-7f3e-4fc6-90b4-d8d0eca433fc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JhZTYzLTdhOGUtNDE2Zi1iM2U5LWQ2NWE3ZjQ4NWZjZVwvZGZxbTZ3MC01NGVjYTFiNC03ZjNlLTRmYzYtOTBiNC1kOGQwZWNhNDMzZmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VulLYlivjFImkeVeOswgagGM7D5mHYJSl__4kBfa66Y" alt="Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground"/>
                <Image src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/053bae63-7a8e-416f-b3e9-d65a7f485fce/dfqm6w0-54eca1b4-7f3e-4fc6-90b4-d8d0eca433fc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JhZTYzLTdhOGUtNDE2Zi1iM2U5LWQ2NWE3ZjQ4NWZjZVwvZGZxbTZ3MC01NGVjYTFiNC03ZjNlLTRmYzYtOTBiNC1kOGQwZWNhNDMzZmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VulLYlivjFImkeVeOswgagGM7D5mHYJSl__4kBfa66Y" alt="Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground"/>
                <Image src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/053bae63-7a8e-416f-b3e9-d65a7f485fce/dfqm6w0-54eca1b4-7f3e-4fc6-90b4-d8d0eca433fc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JhZTYzLTdhOGUtNDE2Zi1iM2U5LWQ2NWE3ZjQ4NWZjZVwvZGZxbTZ3MC01NGVjYTFiNC03ZjNlLTRmYzYtOTBiNC1kOGQwZWNhNDMzZmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VulLYlivjFImkeVeOswgagGM7D5mHYJSl__4kBfa66Y" alt="Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground"/>
                <Image src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/053bae63-7a8e-416f-b3e9-d65a7f485fce/dfqm6w0-54eca1b4-7f3e-4fc6-90b4-d8d0eca433fc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JhZTYzLTdhOGUtNDE2Zi1iM2U5LWQ2NWE3ZjQ4NWZjZVwvZGZxbTZ3MC01NGVjYTFiNC03ZjNlLTRmYzYtOTBiNC1kOGQwZWNhNDMzZmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VulLYlivjFImkeVeOswgagGM7D5mHYJSl__4kBfa66Y" alt="Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground"/>

            </Carousel>
        </Card>

    </Box>

  )
}