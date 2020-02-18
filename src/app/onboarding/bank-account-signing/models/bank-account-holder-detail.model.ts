export interface BankAccountHolderDetailModel {
    Id: string;
    AccountId: number;
    FirstName: string;
    LastName:string;
    EmailAddress:number;
    SortCode:string;
    AccountNumber:string;
    AccountName:string;
    OrganisationId: string;
    OrganisationName:string;
    OrganisationStreet:string;
    OrganisationLocality:string;
    OrganisationCity:string;
    OrganisationZipCode:string;
    InvitationExpiredDateTime: Date;
    InvitationIsExpired: boolean;
}