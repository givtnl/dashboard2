import { RelationshipType } from 'src/app/organisations/enums/relationship-type.model';

export interface RelationshipListModel {
    ProvidingOrganisationId: string;
    Type: RelationshipType
}