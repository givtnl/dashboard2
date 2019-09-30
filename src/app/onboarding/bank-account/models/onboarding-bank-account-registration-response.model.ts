export interface OnboardingBankAccountRegistrationResponseModel {
    Iban:string;
    SortCode:string;
    AccountNumber:string;
    AccountName:string;
    RequiredInputs: Array<string>;
}