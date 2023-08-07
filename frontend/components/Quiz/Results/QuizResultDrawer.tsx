import {useEffect, useRef, useState} from "react";
import ApiClient from "@/utils/api-client";
import {
    Button, ButtonGroup,
    Center,
    Drawer,
    DrawerBody,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Spinner
} from "@chakra-ui/react";

interface QuizResultDrawerProps {
    drawerState: boolean;
    closeDrawer: () => void;
    fetchData: any;
}

const QuizResultDrawer = ({ drawerState, closeDrawer, fetchData }: QuizResultDrawerProps) => {
    const [attempts, setAttempts] = useState<any>(null);

    const [isLoading, setLoading] = useState(false);

    const btnRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        const apiClient = new ApiClient();
        apiClient
            .get(`quiz/results/8`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                fetchData(data);
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

export default QuizResultDrawer;