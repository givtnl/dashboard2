import { RelationshipType } from 'src/app/organisations/enums/relationship-type.model';

export interface CreateRelationshipCommand {
    usingOrganisationId:string;
    providingOrganisationId: string;
    rules: RelationshipType[];
}