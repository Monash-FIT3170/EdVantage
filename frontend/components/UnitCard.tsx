import { AspectRatio, Badge, Box, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type UnitCardProps = {
  heading: string;
  thumbnail?: string;  // Optional thumbnail link
  unit: string;
};

const UnitCard = ({ heading, thumbnail, unit }: UnitCardProps) => {
  const router = useRouter();
  const currentURL = router.asPath; // Current URL path (e.g., /unit/:unitId)

  const newURL = `${currentURL}unit/${unit}`; // Appending video heading to current URL

  return (
    <Link href={newURL}>
      <Box width={'sm'} borderWidth={'1px'} borderRadius={'lg'} _hover={{ boxShadow: "xl" }}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={thumbnail ||
              'https://images.unsplash.com/photo-1684581789611-0e2f91826b46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80'
            }
            alt={'thumbnail'}
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
    </Link>
  );
};

export default UnitCard;
