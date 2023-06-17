import request from 'supertest';
import { quizRouter } from './Quiz';
import express from 'express';

describe('quizRouter', () => {
  let app: any;
  beforeAll(() => {
    app = express()
    app.use(express.json())
    app.use(quizRouter)
  })

  describe('GET /quiz/:id', () => {
    test('should return 200 with the question object when given a valid ID', async () => {
      const response = await request(app).get('/quiz/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        question: 'What is the capital of France?',
        type: 1,
        answer: 'paris',
      });
    });

    test('should return 404 when given an invalid ID', async () => {
      const response = await request(app).get('/quiz/999');

      expect(response.status).toBe(404);
      expect(response.text).toBe('Quiz question not found');
    });
  });

  describe('POST /quiz/answer', () => {
    test('should return 200 with the correct isCorrect and nextQuestionId values', async () => {
      const answer = {
        questionId: 2,
        answer: 'Pacific Ocean',
      };

      const response = await request(app)
        .post('/quiz/answer')
        .send(answer);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        isCorrect: true,
        nextQuestionId: undefined,
      });
    });

    test('should return 404 when given an invalid question ID', async () => {
      const answer = {
        questionId: 999,
        answer: 'Paris',
      };
      const response = await request(app)
        .post('/quiz/answer')
        .send(answer);

      expect(response.status).toBe(404);
      expect(response.text).toBe('Quiz question not found');
    });

    test('should return isCorrect false when given an incorrect answer', async () => {
      const answer = {
        questionId: 2,
        answer: 'Atlantic Ocean',
      };
      const response = await request(app)
        .post('/quiz/answer')
        .send(answer);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        isCorrect: false,
        nextQuestionId: undefined,
      });
    });
  });
});
