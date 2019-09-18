export interface OnboardingBankAccountRegistrationResponseModel {
    Iban:string;
    SortCode:string;
    AccountNumber:string
    AccountHolderFirstName: string;
    AccountHolderLastName:string;
    RequiredInputs: Array<string>;
}