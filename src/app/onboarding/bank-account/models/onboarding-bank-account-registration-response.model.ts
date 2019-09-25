export interface OnboardingBankAccountRegistrationResponseModel {
    Iban:string;
    SortCode:string;
    AccountNumber:string
    AccountName;
    RequiredInputs: Array<string>;
}