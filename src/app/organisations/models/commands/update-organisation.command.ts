export interface UpdateOrganisationCommand {
    Id: string;
    Name: string;
    AddressLine1: string; // address 
    AddressLine2: string; // locality
    AddressLine3: string; // city
    AddressLine4: string; // ????
    AddressLine5: string; // ????
    PostalCode: string;
    ParentId: string;
    CharityCommissionNumber: string;
    Country?: string;
    Regulator?: string;
    ReferenceWithRegulator?: string;
    ReferenceWithParent?: string;
    ReferenceWithHMRC?: string;
}