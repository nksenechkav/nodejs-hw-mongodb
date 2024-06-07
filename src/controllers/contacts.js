 // src/controllers/contacts.js

 import { createContact, getAllContacts, getContactById } from '../services/contacts.js';
 import createHttpError from 'http-errors';
//  import mongoose from 'mongoose';

 export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
 };

 export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(contactId)) {
    //   next(createHttpError(404, 'Contact not found'));
    //   return;
    // }

    const contact = await getContactById(contactId);
    if (!contact) {
      next(createHttpError(404, `Contact not found`));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
 };

 export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
