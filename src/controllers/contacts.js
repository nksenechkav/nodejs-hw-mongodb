 // src/controllers/contacts.js

 import { getAllContacts, getContactById } from '../services/contacts.js';

 export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
 };

 export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
 };
