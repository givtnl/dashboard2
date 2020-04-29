import { OrganisationType } from './OrganisationType';

export interface CreatePreboardingQueryParamsCommand {
    country: string;
    type: OrganisationType;
}