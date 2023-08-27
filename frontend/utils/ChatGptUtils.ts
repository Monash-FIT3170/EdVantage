export default class ChatGptUtils {
  constructor() {}

  buildChatGptQuizRequestBody(question: string, answer: string) {
    let body: any = {};
    body['model'] = 'gpt-3.5-turbo';

    let messages = [];
    let messagesData: any = {};
    messagesData['role'] = 'user'

    messagesData['content'] = `Act as a personal tutor for this scenario. I'm gonna provide you with a question and an answer" +
        "from a student, and you need to give a short (ideally <50, max 100 word) explanation of why the answer is correct" +
        "or why it is incorrect.\nQuestion: ${question}\nAnswer: ${answer}`;
    messages.push(messagesData);

    body['messages'] = messages;
    return body;
  }
}
