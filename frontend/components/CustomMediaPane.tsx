import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
} from '@chakra-ui/react';

const CustomMediaPane = () => {
  return (
    <Box maxW={'2xl'}>
      <Card my={6} variant={'outline'}>
        <CardBody>
          <Image
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/053bae63-7a8e-416f-b3e9-d65a7f485fce/dfqm6w0-54eca1b4-7f3e-4fc6-90b4-d8d0eca433fc.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JhZTYzLTdhOGUtNDE2Zi1iM2U5LWQ2NWE3ZjQ4NWZjZVwvZGZxbTZ3MC01NGVjYTFiNC03ZjNlLTRmYzYtOTBiNC1kOGQwZWNhNDMzZmMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VulLYlivjFImkeVeOswgagGM7D5mHYJSl__4kBfa66Y"
            alt="Fantasy wolf wearing horn tiara and silhouette of a woman in the foreeground"
          />
          <Stack mt="6" spacing="3">
            <Heading size="lg">Custom Media Content</Heading>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CustomMediaPane;
