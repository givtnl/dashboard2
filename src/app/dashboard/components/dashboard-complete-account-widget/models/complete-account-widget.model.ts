import { OrganisationRegistrationStatus } from '../enums/organisationregistrationstatus.enum';

export interface CompleteAccountWidgetModel {
    DisplayOrder: number;
    Finished: boolean;
    InProgress: boolean;
    OrganisationRegistrationStatus: OrganisationRegistrationStatus;
    OrganisationRegistrationStatusDescription: string;
}