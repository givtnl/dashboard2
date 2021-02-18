export interface CreateCollectGroupContactCommand {
    Role: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Telephone: string | null;
}