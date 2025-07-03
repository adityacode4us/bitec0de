var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Op } from "sequelize";
import Contacts from "../../models/Contacts.js";
const IdentifyContactsController = {
    identifyContacts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phoneNumber } = yield req.query;
                // Fetch all contacts with either the given email or phone number
                const contactsWithEmailOrPhone = yield Contacts.findAll({
                    where: {
                        [Op.or]: [{ email: email }, { phoneNumber: phoneNumber }],
                    },
                    order: [["createdAt", "ASC"]], // Order by creation date
                });
                let primaryContact;
                let secondaryContacts = [];
                if (contactsWithEmailOrPhone.length === 0) {
                    // No existing contacts found, create a new primary contact
                    primaryContact = yield Contacts.create({
                        email: email,
                        phoneNumber: phoneNumber,
                        linkedId: null,
                        linkedPrecedence: "primary",
                    });
                }
                else {
                    // Find the primary contact among existing contacts
                    primaryContact = contactsWithEmailOrPhone.find((contact) => contact.linkedPrecedence === "primary");
                    if (!primaryContact) {
                        // If no primary contact found, the first contact becomes primary
                        primaryContact = contactsWithEmailOrPhone[0];
                        // Update all other contacts to be secondary and link to this primary
                        for (let i = 1; i < contactsWithEmailOrPhone.length; i++) {
                            yield contactsWithEmailOrPhone[i].update({
                                linkedId: primaryContact.id,
                                linkedPrecedence: "secondary",
                            });
                        }
                        // Update the primary contact
                        yield primaryContact.update({
                            linkedId: null,
                            linkedPrecedence: "primary",
                        });
                    }
                    else {
                        // Check if we need to create a new contact and link it as secondary
                        const hasEmail = contactsWithEmailOrPhone.some((contact) => contact.email === email);
                        const hasPhone = contactsWithEmailOrPhone.some((contact) => contact.phoneNumber === phoneNumber);
                        if (!hasEmail || !hasPhone) {
                            // Create a new secondary contact
                            const newSecondaryContact = yield Contacts.create({
                                email: email,
                                phoneNumber: phoneNumber,
                                linkedId: primaryContact.id,
                                linkedPrecedence: "secondary",
                            });
                            contactsWithEmailOrPhone.push(newSecondaryContact);
                        }
                    }
                    secondaryContacts = contactsWithEmailOrPhone.filter((contact) => contact.id !== primaryContact.id);
                }
                // Collect all unique emails and phone numbers
                const allContacts = [primaryContact, ...secondaryContacts];
                const emails = [
                    ...new Set(allContacts.map((contact) => contact.email).filter(Boolean)),
                ];
                const phoneNumbers = [
                    ...new Set(allContacts
                        .map((contact) => contact.phoneNumber)
                        .filter(Boolean)),
                ];
                const secondaryContactIds = secondaryContacts.map((contact) => contact.id);
                return res.status(200).json({
                    contact: {
                        primaryContatctId: primaryContact.id,
                        emails: emails,
                        phoneNumbers: phoneNumbers,
                        secondaryContactIds: secondaryContactIds,
                    },
                });
            }
            catch (err) {
                return next(err);
            }
        });
    },
};
export default IdentifyContactsController;
//# sourceMappingURL=IdentifyContacts.js.map