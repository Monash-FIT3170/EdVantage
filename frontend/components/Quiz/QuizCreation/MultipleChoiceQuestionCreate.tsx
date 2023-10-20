import { useQuizCreationContext } from '@/pages/QuizCreationPage';
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
  const [question, setQuestion] = useState(props.question || '');
  const [choices, setChoices] = useState(props.choices || []);
  const [answer, setAnswer] = useState(props.correct_answers || [])
  const { questionInformation, setQuestionInformation } = useQuizCreationContext();
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

  useEffect(() => {
    const mcInfo = {
      question_id: props.id,
      question: question,
      title: question,
      type: 'multiple_choice',
      question_type: 'multiple_choice',
      choices: choices,
      correct_answers: answer,
      answers: answer.map(ans => ({ answer: ans }))
    }
    setQuestionInformation(props.id, mcInfo)
  }, [question, choices, answer])

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
    setChoices((prevChoices) => [
      ...prevChoices,
      {
        option_id: optionKey,
        question_id: props.id,
        option: optionAdd,
        is_correct: false,
      },
    ]);
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
  const radioGroupChange = (nextValue: string) => {
    setOptionDelete(nextValue);
    setAnswer([nextValue])
  }
  return (
    <div style={{ marginLeft: '10px' }}>
      <div style={{ width: '50%' }}>
        <Input
          placeholder={props.question ? props.question : 'Enter your question'}
          required
          onChange={(e) => { setQuestion(e.target.value)}}
          value={question}
        // onChange
        />{' '}
      </div>
      <RadioGroup onChange={radioGroupChange} value={optionDelete}>
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
