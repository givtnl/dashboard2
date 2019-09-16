export interface OnboardingBankAccountRegistrationResponseModel {
    Iban:string;
    Name: string;
    SortCode:string;
    AccountNumber:string
    RequiredInputs: Array<string>;
}