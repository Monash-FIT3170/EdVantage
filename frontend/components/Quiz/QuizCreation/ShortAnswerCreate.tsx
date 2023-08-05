import { Input, Button, Flex } from '@chakra-ui/react';
const ShortAnswerCreate = () => {
  return (
    <div style={{ marginBottom: '10px', display: 'flex' }}>
      <div style={{ width: '50%', marginLeft: '10px' }}>
        <Input placeholder="Enter your question" required />
      </div>
    </div>
  );
};
export default ShortAnswerCreate;
