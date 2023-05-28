import { useRef, useEffect, useState } from "react";
import {
  ButtonGroup,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  Center,
  Spinner,
  Stack,
  Box,
} from "@chakra-ui/react";
import ApiClient from "@/utils/api-client";
import { Select } from "chakra-react-select";
import Quiz from "@/components/Quiz/Quiz";

interface QuizDrawerProps {
  id: string;
  drawerState: boolean;
  closeDrawer: () => void;
}

const QuizDrawer = ({ id, drawerState, closeDrawer }: QuizDrawerProps) => {
  const [quizzes, setQuizzes] = useState<any>(null);

  const [quiz, setQuiz] = useState<any>(null);

  const [isLoading, setLoading] = useState(false);

  const btnRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const apiClient = new ApiClient();
    apiClient
      .get(`quiz`)
      .then((res) => res.json())
      .then((data) => {
        const quizResponses = [];
        for (const i in data) {
          const currQuiz: any = {};
          currQuiz.label = data[i].title;
          currQuiz.value = data[i].quiz_id;
          currQuiz.questions = data[i].questions;
          quizResponses.push(currQuiz);
        }
        setQuizzes(quizResponses);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Drawer
        isOpen={drawerState}
        onClose={closeDrawer}
        finalFocusRef={btnRef}
        placement={"left"}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          {isLoading ? (
            <Center h="100%">
              <Spinner size={"xl"} />
            </Center>
          ) : (
            <>
              <DrawerHeader as={"b"} fontSize={"xl"}>
                Test your knowledge!
              </DrawerHeader>
              <DrawerBody>
                <Stack spacing={4}>
                  <Select
                    name="quizzes"
                    options={quizzes}
                    placeholder="Select a quiz..."
                    closeMenuOnSelect={true}
                    onChange={setQuiz}
                    value={quiz}
                    size="lg"
                  />
                  <Box>{quiz && <Quiz quiz={quiz} />}</Box>
                </Stack>
              </DrawerBody>
            </>
          )}

          <DrawerFooter>
            <ButtonGroup spacing={2}>
              <Button onClick={closeDrawer} variant={"outline"}>
                Close
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default QuizDrawer;
