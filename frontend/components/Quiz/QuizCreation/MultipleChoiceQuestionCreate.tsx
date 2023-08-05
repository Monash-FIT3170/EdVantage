import { Stack, Radio, RadioGroup, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
const MultipleChoiceQuestionCreate = () => {
  const [OptionSet, setOptionSet] = useState<JSX.Element[]>([]);
  const [optionAdd, setOptionAdd] = useState('Enter your option');
  const [optionDelete, setOptionDelete] = useState('short-answer');
  const [optionKey, setOptionKey] = useState(0);
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
    <div>
      <div style={{ width: '50%' }}>
        <Input placeholder="Enter your question" />
      </div>
      <RadioGroup onChange={setOptionDelete} value={optionDelete}>
        <Stack direction="row">{OptionSet}</Stack>
      </RadioGroup>
      <div style={{ width: '50%' }}>
        <Input placeholder="Enter your option" onChange={onChange} />
      </div>
      <div style={{ display: 'flex', padding: '10px', marginTop: '5px' }}>
        <Button
          onClick={addOption}
          style={{ marginRight: '10px' }}
          colorScheme="blue"
        >
          Add Option
        </Button>
        <Button onClick={deleteOption} colorScheme="blue">
          Delete Option
        </Button>
      </div>
    </div>
  );
};
export default MultipleChoiceQuestionCreate;
