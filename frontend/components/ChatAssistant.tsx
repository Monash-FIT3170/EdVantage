import React, { useState } from 'react';
import { Box, Input, VStack, Text, Button } from '@chakra-ui/react';

const ChatAssistant = () => {

    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        // Hardcode user's message
        const userMessage = "How are you?";

        // Add the user's message to the chat
        setMessages([...messages, { sender: 'user', text: userMessage }]);

        // Hardcoded bot response
        const botResponse = "I'm just a bunch of code, but I'm functioning properly!";

        // Add bot's response after the user's message
        setMessages([...messages, { sender: 'user', text: userMessage }, { sender: 'bot', text: botResponse }]);
    };

    return (
        <Box border="1px solid black" borderRadius="md" p={4} width="415px" height="495px" bg="black">
            <VStack spacing={2} height="80%">
                {messages.map((message, index) => (
                    <Text key={index} alignSelf={message.sender === 'bot' ? 'flex-start' : 'flex-end'} color="white">
                        {message.text}
                    </Text>
                ))}
            </VStack>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <Input 
                    placeholder="Ask a question." 
                    variant="outline" 
                    borderColor="white"
                    color="white"
                />
                <Button ml={2} onClick={handleSend} colorScheme="whiteAlpha">Send</Button>
            </Box>

        </Box>
    );

}

export default ChatAssistant;