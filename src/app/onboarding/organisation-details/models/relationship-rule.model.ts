import { RelationshipType } from './enums/relationship-type.model';

export interface RelationshipRule {
    RelationshipType: RelationshipType;
    Optional: boolean;
}