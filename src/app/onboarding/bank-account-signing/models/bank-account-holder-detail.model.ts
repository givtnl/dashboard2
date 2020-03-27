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
    OrganisationAdddressLine1: string;
    OrganisationAdddressLine2: string;
    OrganisationAdddressLine3: string;
    OrganisationAdddressLine4: string;
    OrganisationAdddressLine5: string;
    OrganisationZipCode:string;
    InvitationExpiredDateTime: Date;
    InvitationIsExpired: boolean;
}