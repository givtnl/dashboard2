import { OrganisationRegistrationStatus } from '../enums/organisationregistrationstatus.enum';

export class OrganisationRegistrationStep {
    DisplayOrder: number;
    Finished: boolean;
    InProgress: boolean;
    OrganisationRegistrationStatus: OrganisationRegistrationStatus;
    OrganisationRegistrationStatusDescription: string;
}