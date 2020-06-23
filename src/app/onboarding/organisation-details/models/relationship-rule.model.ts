import { RelationshipType } from './enums/relationship-type.model';

export interface RelationShipRule {
    RelationshipType: RelationshipType;
    Optional: boolean;
}