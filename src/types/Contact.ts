enum LinkPrecedence {
    Primary = 'primary',
    Secondary = 'secondary'
}
export interface Contact {
    id: number;
    phoneNumber: string;
    email: string;
    linkedId?: string;
    linkPrecedence: LinkPrecedence;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}