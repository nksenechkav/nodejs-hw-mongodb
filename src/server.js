// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

app.get('/contacts', async (req, res) => {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

app.get('/contacts/:contactId', async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.json({
      status: 404,
      message: `Contact with id ${contactId} is invalid.`,
    });
  }

  const contact = await getContactById(contactId);

  if (!contact) {
    return res.json({
      status: 404,
      message: `Contact with id ${contactId} not found.`,
    });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

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
