import {Contact} from './../types/Contact'

// Helper function to map database rows to Contact interface
export const mapDbRowToContact = (row: any): Contact => ({
    id: row.id,
    phoneNumber: row.phonenumber, // Mapping phonenumber to phoneNumber
    email: row.email,
    linkedId: row.linkedid,
    linkPrecedence: row.linkprecedence,
    createdAt: row.createdat,
    updatedAt: row.updatedat,
    deletedAt: row.deletedat
});