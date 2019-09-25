interface AddBankAccountToOrganisationCommand {
    iban?: string;
    accountName?: string;
    accountHolderFirstName:string;
    accountHolderLastName:string;
    sortCode?: string;
    accountNumber?: string;

}
