import { OrganisationRegulator } from 'src/app/organisations/models/organisation-regulator.model';

export class UpdateOrganisationDetailsCommand {
    name: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    addressLine4: string;
    addressLine5: string;
    postalCode: string;
    referenceWithParent: string;
    charityId: string;
    charityCommissionNumber: string;
    regulator: OrganisationRegulator;
}