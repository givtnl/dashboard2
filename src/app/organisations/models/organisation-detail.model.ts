export interface OrganisationDetailModel{
    Guid: string;
    CrmId: number;
    Name:string;
    TaxDeductable: boolean;
    Address:string;
    Locality:string;
    City:string;
    PostalCode:string;
    Country:string;
    TelNr:string;
    Number:string;
    Iban:string;
    Email:string;
    SortCode:string;
    AccountNumber:string;
    AccountHolderFirstName:string;
    AccountHolderLastName:string;
    GiftAidEnabled?: boolean | null;
    AlreadyKnownParent: boolean;
}