import React, {useRef, useEffect, useState, useContext} from "react";
import {
  ButtonGroup,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  Center,
  Spinner,
  Stack,
  Box,
} from "@chakra-ui/react";
import ApiClient from "@/utils/api-client";
import { Select } from "chakra-react-select";
import Quiz from "@/components/Quiz/Quiz";
import QuizResultDrawer from "@/components/Quiz/Results/QuizResultDrawer";
import {AuthContext, useAuth} from "../AuthProvider";

interface QuizDrawerProps {
  id: string;
  drawerState: boolean;
  closeDrawer: () => void;
  openDialog: () => void;
}

const QuizDrawer = ({ id, drawerState, closeDrawer, openDialog }: QuizDrawerProps) => {
  const [quizzes, setQuizzes] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);

  const [units, setUnits] = useState<any>(null);
  const [unit, setUnit] = useState<any>(null);

  const [isLoading, setLoading] = useState(false);

  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  function openResultsDrawer() { setIsResultsOpen(true); }
  function closeResultsDrawer() { setIsResultsOpen(false); }

  const { isLoggedIn } = useAuth()

  const btnRef = useRef(null);
  const auth = useContext(AuthContext);

  const getQuizzes = (value: any): void => {
    setLoading(true);
    setQuiz("")
    setUnit(value);
    const apiClient = new ApiClient();
    apiClient
      .get(`quiz`, "unit_code=" + value.value)
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
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    const apiClient = new ApiClient();
    apiClient
      .get(`users/${auth?.user?.userId}/units`)
      .then((res) => res.json())
      .then((data) => {
        const unitResponses = [];
        for (const i in data) {
          const currUnit: any = {};
          currUnit.label = data[i].unit_code + ": " + data[i].unit_name;
          currUnit.value = data[i].unit_code;
          currUnit.name = data[i].unit_name;
          unitResponses.push(currUnit)
        }
        setUnits(unitResponses);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div />;

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
                    name="units"
                    options={units}
                    placeholder="Select a unit..."
                    closeMenuOnSelect={true}
                    onChange={getQuizzes}
                    value={unit}
                    size="lg"
                  />

                  {unit && (<Select
                    name="quizzes"
                    options={quizzes}
                    placeholder="Select a quiz..."
                    closeMenuOnSelect={true}
                    onChange={setQuiz}
                    value={quiz}
                    size="lg"
                  />)}
                  <Box>{quiz && <Quiz quiz={quiz} />}</Box>
                </Stack>
              </DrawerBody>
            </>
          )}

          <DrawerFooter>
            <ButtonGroup spacing={2}>
              <Button variant={"outline"} colorScheme="blue" onClick={openResultsDrawer}>
                Results
              </Button>
              <Button onClick={closeDrawer} variant={"outline"}>
                Close
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>

        {isResultsOpen && (
          <QuizResultDrawer
            drawerState={isResultsOpen}
            closeDrawer={closeResultsDrawer}
            fetchData={setResultsData}
          />
        )}
      </Drawer>
    </>
  );
};

export default QuizDrawer;
