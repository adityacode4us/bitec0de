import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import Contacts from "../../models/Contacts.js";

const IdentifyContactsController = {
  async identifyContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, phoneNumber } = await req.query;

      // Fetch all contacts with either the given email or phone number
      const contactsWithEmailOrPhone = await Contacts.findAll({
        where: {
          [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
        },
        order: [["createdAt", "ASC"]], // Order by creation date
      });

      let primaryContact:any;
      let secondaryContacts:any = [];

      if (contactsWithEmailOrPhone.length === 0) {
        // No existing contacts found, create a new primary contact
        primaryContact = await Contacts.create({
          email: email,
          phoneNumber: phoneNumber,
          linkedId: null,
          linkedPrecedence: "primary",
        });
      } else {
        // Find the primary contact among existing contacts
        primaryContact = contactsWithEmailOrPhone.find(
          (contact) => (contact as any).linkedPrecedence === "primary"
        );

        if (!primaryContact) {
          // If no primary contact found, the first contact becomes primary
          primaryContact = contactsWithEmailOrPhone[0];

          // Update all other contacts to be secondary and link to this primary
          for (let i = 1; i < contactsWithEmailOrPhone.length; i++) {
            await contactsWithEmailOrPhone[i].update({
              linkedId: primaryContact.id,
              linkedPrecedence: "secondary",
            });
          }

          // Update the primary contact
          await primaryContact.update({
            linkedId: null,
            linkedPrecedence: "primary",
          });
        } else {
          // Check if we need to create a new contact and link it as secondary
          const hasEmail = contactsWithEmailOrPhone.some(
            (contact) => (contact as any).email === email
          );
          const hasPhone = contactsWithEmailOrPhone.some(
            (contact) => (contact as any).phoneNumber === phoneNumber
          );

          if (!hasEmail || !hasPhone) {
            // Create a new secondary contact
            const newSecondaryContact = await Contacts.create({
              email: email,
              phoneNumber: phoneNumber,
              linkedId: primaryContact.id,
              linkedPrecedence: "secondary",
            });
            contactsWithEmailOrPhone.push(newSecondaryContact);
          }
        }

        secondaryContacts = contactsWithEmailOrPhone.filter(
          (contact) => (contact as any).id !== primaryContact.id
        );
      }

      // Collect all unique emails and phone numbers
      const allContacts = [primaryContact, ...secondaryContacts];
      const emails = [
        ...new Set(
          allContacts.map((contact) => (contact as any).email).filter(Boolean)
        ),
      ];
      const phoneNumbers = [
        ...new Set(
          allContacts
            .map((contact) => (contact as any).phoneNumber)
            .filter(Boolean)
        ),
      ];
      const secondaryContactIds = secondaryContacts.map(
        (contact:any) => contact.id
      );

      return res.status(200).json({
        contact: {
          primaryContatctId: primaryContact.id,
          emails: emails,
          phoneNumbers: phoneNumbers,
          secondaryContactIds: secondaryContactIds,
        },
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default IdentifyContactsController;
