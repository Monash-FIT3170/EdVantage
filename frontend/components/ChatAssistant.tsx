import React, { useState } from 'react';
import { Box, Input, VStack, Text, Button } from '@chakra-ui/react';
import OpenAI from "openai/index";
import ChatGptUtils from "@/utils/ChatGptUtils";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Long-term, ensure secret credentials are not exposed with this method
});

const ChatAssistant = () => {

    const [messages, setMessages] = useState<any>([]);
    const [currentMsg, setCurrentMsg] = useState<any>(null);

    const handleSend = async () => {
      // Hardcode user's message
      const userMessage = currentMsg;

      // Add the user's message to the chat
      setMessages([...messages, {sender: 'user', text: userMessage}]);
      setCurrentMsg(null);

      // Hardcoded bot response
      const chatGptUtils = new ChatGptUtils();
      const requestBody = chatGptUtils.buildChatGptAssistantRequestBody(userMessage)
      const completion = await openai.chat.completions.create(requestBody);


      const botResponse = completion.choices[0].message['content'];

      // Add bot's response after the user's message
      setMessages([...messages, {sender: 'user', text: userMessage}, {sender: 'bot', text: botResponse}]);
    };

    return (
        <Box border="1px solid black" borderRadius="md" p={4} width="415px" height="495px" >
            <VStack spacing={2} height="80%">
                {messages.map((message: any, index: any) => (
                    <Text key={index} alignSelf={message.sender === 'bot' ? 'flex-start' : 'flex-end'}>
                        {message.text}
                    </Text>
                ))}
            </VStack>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <Input
                    placeholder="Ask a question."
                    variant="outline"
                    onChange={(e) => setCurrentMsg(e.target.value)}
                />
                <Button ml={2} onClick={handleSend}>Send</Button>
            </Box>

        </Box>
    );

}

export default ChatAssistant;