
import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import query from "../db";
import { ApiResponse } from "../utils/ApiResponse";
import { Contact } from "../types/Contact";
import { mapDbRowToContact } from "../dbMapper/dpMapper";

//interface for response data
interface TransformedData {
    contact: {
        primaryContactId: number;
        emails: string[];
        phoneNumbers: string[];
        secondaryContactIds: number[];
    };
}
export const createIdentity = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, phoneNumber } = req.body
    try {
        // Check if contact with either phoneNumber or email exists
        let existingContacts: Contact[] = await query(
            'SELECT * FROM contact WHERE phoneNumber = $1 OR email = $2 ',
            [phoneNumber, email]
          );
        
        let mappedContact: Contact[] = existingContacts.map(mapDbRowToContact);

        // Map existing contacts
        let mappedExistingContacts: Contact[] = existingContacts.map(mapDbRowToContact);
        mappedExistingContacts = mappedExistingContacts.filter(contact => contact.linkPrecedence === 'primary');
        //sort so that we get oldest primary identity
        mappedExistingContacts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        // Prepare response structure
        const responseData: TransformedData = {
            contact: {
                primaryContactId: 0,
                emails: [],
                phoneNumbers: [],
                secondaryContactIds: [],
            },
        };

        let primaryContact = mappedExistingContacts[0]

        if (!primaryContact) {
            //insert if we dont find any primary identity
            const newPrimaryContact = await query(
                'INSERT INTO CONTACT (phoneNumber, email, linkPrecedence, linkedId) VALUES ($1, $2, $3, $4) RETURNING *',
                [phoneNumber, email, 'primary', null]
            );
            primaryContact = mapDbRowToContact(newPrimaryContact[0]);
        } else {
            if ((email && !mappedContact.find(contact => contact.email === email)) && (phoneNumber && !mappedContact.find(contact => contact.phoneNumber === phoneNumber))) {
                //insert if we get new information either email or phonenumber
                await query(
                    'INSERT INTO contact (phonenumber, email, linkprecedence, linkedid) VALUES ($1, $2, $3, $4)',
                    [phoneNumber, email, 'secondary', primaryContact.id]
                );
            }

            mappedContact.forEach(async contact => {
                if (contact.id !== primaryContact.id && contact.linkPrecedence === 'primary') {
                    //handling condition when primary turns to secondary
                    await query('UPDATE CONTACT SET linkPrecedence = $1, linkedId = $2 WHERE id = $3',
                        ['secondary', primaryContact.id, contact.id]
                    );
                }
            })

        }
        const rows: Contact[] = await query('SELECT * FROM contact WHERE (id = $1 OR linkedid = $1)', [primaryContact?.id])
        const mappedRows: Contact[] = rows.map(mapDbRowToContact);
        mappedRows.forEach((row: Contact) => {
            if (row.linkPrecedence === 'primary') {
                responseData.contact.primaryContactId = row.id;
            } else {
                responseData.contact.secondaryContactIds.push(row.id);
            }
            if (!responseData.contact.emails.includes(row.email)) {
                responseData.contact.emails.push(row.email);
            }
            if (!responseData.contact.phoneNumbers.includes(row.phoneNumber)) {
                responseData.contact.phoneNumbers.push(row.phoneNumber);
            }
        });
        return res.status(200).json(new ApiResponse(200, responseData));
    } catch (error) {
        next(error);
    }
})
