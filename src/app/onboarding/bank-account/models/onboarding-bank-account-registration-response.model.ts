export interface OnboardingBankAccountRegistrationResponseModel {
    Iban:string;
    SortCode:string;
    AccountNumber:string
    RequiredInputs: Array<string>;
}