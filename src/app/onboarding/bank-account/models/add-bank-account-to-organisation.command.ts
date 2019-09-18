interface AddBankAccountToOrganisationCommand {
    name: string;
    sortCode?: string;
    accountNumber?: string;
    organisationId: string;
}
