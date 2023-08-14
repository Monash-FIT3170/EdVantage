import { Stack, Radio, RadioGroup, Input, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
type questionCardProp = {
    id: number;
    quizId: number;
    question: string;
    choices: choiceProp[];
    correct_answers: string[];
};
type choiceProp = {
    option_id: number;
    question_id: number;
    option: string;
    is_correct: boolean;
};

const MultipleChoiceQuestionCreate = (props: questionCardProp) => {

    const [OptionSet, setOptionSet] = useState<JSX.Element[]>([]);
    const [optionAdd, setOptionAdd] = useState('Enter your option');
    const [optionDelete, setOptionDelete] = useState('short-answer');
    const [optionKey, setOptionKey] = useState(0);

    useEffect(() => {
        for (let i = 0; i < props.choices.length; i++) {
            setOptionSet((preOptionSet) => [
                ...preOptionSet,
                <Radio key={props.choices[i].option_id} value={props.choices[i].option}>
                    {props.choices[i].option}
                </Radio>,
            ]);
        }

        setOptionDelete(props.correct_answers[0]);
    }, []);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setOptionAdd(e.currentTarget.value);
    };

    const addOption = () => {
        if (optionAdd == 'Enter your option' || optionAdd == '') {
            return;
        }

        if (OptionSet.some((option) => option.props.value === optionAdd)) {
            return;
        }

        setOptionSet([
            ...OptionSet,
            <Radio key={optionKey} value={optionAdd}>
                {optionAdd}
            </Radio>,
        ]);

        setOptionKey((prevOptionKey) => prevOptionKey + 1);
    };

    const deleteOption = () => {
        setOptionSet((prevOptionSet) =>
            prevOptionSet.filter((option) => option.props.value !== optionDelete)
        );
    };

    return (
        <div style={{ marginLeft: '10px' }}>
            <div style={{ width: '50%' }}>
                <Input
                    placeholder={props.question ? props.question : 'Enter your question'}
                    required
                />{' '}
            </div>
            <RadioGroup onChange={setOptionDelete} value={optionDelete}>
                <Stack direction="row">{OptionSet}</Stack>
            </RadioGroup>
            <div style={{ width: '50%', marginTop: '5px' }}>
                <Input placeholder="Enter your option" onChange={onChange} />
            </div>
            <div style={{ display: 'flex', padding: '10px', marginTop: '5px' }}>
                <Button
                    onClick={addOption}
                    style={{ marginRight: '10px' }}
                    colorScheme="blue"
                    size="sm"
                >
                    Add Option
                </Button>
                <Button onClick={deleteOption} colorScheme="blue" size="sm">
                    Delete Option
                </Button>
            </div>
        </div>
    );
};

export default MultipleChoiceQuestionCreate;