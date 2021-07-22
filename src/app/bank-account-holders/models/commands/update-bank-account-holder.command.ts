export interface UpdateBankAccountHolderCommand {
    id: string;
    accountId: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
}