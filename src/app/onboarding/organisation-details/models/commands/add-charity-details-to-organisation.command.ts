import { OrganisationRegulator } from 'src/app/organisations/models/organisation-regulator.model';

export class AddCharityDetailsToOrganisationCommand {
    name: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    // address: string
    postalCode: string;
    // city: string;
    // locality: string;
    charityCommissionNumber: string;
    regulator: OrganisationRegulator;
}