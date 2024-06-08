
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
    console.log(req.body)
    const { email, phoneNumber } = req.body
    try {
        // Check if contact with either phoneNumber or email exists
        const existingContacts:Contact[] = await query(
            'SELECT * FROM CONTACT WHERE phoneNumber = $1 OR email = $2',
            [phoneNumber, email]
        );
        // Map existing contacts
        const mappedExistingContacts: Contact[] = existingContacts.map(mapDbRowToContact);

        // Prepare response structure
        const responseData: TransformedData = {
            contact: {
                primaryContactId: 0,
                emails: [],
                phoneNumbers: [],
                secondaryContactIds: [],
            },
        };
        if (mappedExistingContacts.length === 0) {

            // No existing contacts, create new contact with linkPrecedence as primary
            const newContactArray:Contact[] = await query(
                'INSERT INTO CONTACT (phoneNumber, email, linkPrecedence, linkedId) VALUES ($1, $2, $3, $4) RETURNING *',
                [phoneNumber, email, 'primary', null]
            );

            //map contact
            const newContact:Contact = mapDbRowToContact(newContactArray[0])
            //add data to response 
            responseData.contact.emails.push(newContact.email)
            responseData.contact.primaryContactId = newContact.id
            responseData.contact.phoneNumbers.push(newContact.phoneNumber)
            return res.status(201).json(new ApiResponse(200, responseData));
        } else {
            // Existing contacts found
            let primaryContact = mappedExistingContacts.filter(contact => contact.linkPrecedence === 'primary');
            let oldestPrimaryContact = primaryContact.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0];
            // Check if incoming request has new information
            const isNewInformation = mappedExistingContacts.every(contact => contact.phoneNumber !== phoneNumber || contact.email !== email);
            if (isNewInformation) {
                // check if incoming email is already present
                const existingEmail = mappedExistingContacts.find(contact => contact.email === email);
                //check if incoming phoneNumber is already present
                const existingPhoneNumber = mappedExistingContacts.find(contact => contact.phoneNumber === phoneNumber);
                if (!existingEmail && !existingPhoneNumber) {
                    //if both are not present then insert new record into contact table
                    await query(
                        'INSERT INTO public.contact (phonenumber, email, linkprecedence, linkedid) VALUES ($1, $2, $3, $4)',
                        [phoneNumber, email, 'secondary', oldestPrimaryContact.id]
                    );
                }
            }
            // Ensure all other contacts are linked to the primary contact
            await query('UPDATE CONTACT SET linkPrecedence = $1, linkedId = $2 WHERE id != $3 AND (phoneNumber = $4 OR email = $5)',
                ['secondary', oldestPrimaryContact.id, oldestPrimaryContact.id, phoneNumber, email]
            );
            const rows:Contact[] = await query('SELECT * FROM CONTACT c WHERE c.linkPrecedence =$1 OR c.linkedId IN (SELECT id FROM contact where linkPrecedence=$2)', ['primary', 'primary'])
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
        }
    } catch (error) {
        next(error);
    }
})
