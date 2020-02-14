export enum BankAccountActiveStatusFilter {
    Active = 0,
    NotActive = 1,
    All = 2
}

export enum BankAccountPrimaryStatusFilter {
    Primary = 0,
    NotPrimary= 1,
    All = 2
}

export enum BankAccountVerificationStatusFilter {
    Verified = 0,
    NotVerified= 1,
    All = 2
}



export interface BankAccountFilterModel {
    activeFilter?: BankAccountActiveStatusFilter;
    primaryFilter?: BankAccountPrimaryStatusFilter;
    verifiedFilter?: BankAccountVerificationStatusFilter;
}