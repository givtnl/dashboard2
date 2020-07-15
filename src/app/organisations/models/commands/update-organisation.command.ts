import { OrganisationRegulator } from '../organisation-regulator.model';

export interface UpdateOrganisationCommand {
    Id: string;
    Name: string;
    AddressLine1: string; // address 
    AddressLine2: string; // locality
    AddressLine3: string; // city
    AddressLine4: string; // ????
    AddressLine5: string; // ????
    PostalCode: string;
    CharityCommissionNumber: string;
    Country?: string;
    Regulator?: OrganisationRegulator;
    ReferenceWithParent?: string;
    CharityId?: string | null;
}