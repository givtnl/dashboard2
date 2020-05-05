import { OrganisationType } from './organisation-type.enum';

export interface PreboardingDetailModel { 
    token: string;
    organisationName: string;
    organisationId: string; 
    emailAddress: string;
    country: string;
    type: OrganisationType;
    language: string;
    inviteEmails?: string[]
}