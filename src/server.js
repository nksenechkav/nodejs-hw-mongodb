// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js'; // Імпортуємо роутер

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      status: 200,
      message: 'Hello World!',
    });
  });

  app.use(contactsRouter); // Add router to app as middleware

  app.use('*', (req, res, next) => {
    res.json({
      status: 404,
      message: 'Not found',
    });
    next();
  });

  app.use((err, req, res, next) => {
    res.json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
