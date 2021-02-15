export interface CreateContactCommand {
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string | null;
}