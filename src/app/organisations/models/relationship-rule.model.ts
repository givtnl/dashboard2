import { RelationshipType } from '../enums/relationship-type.model';

export interface RelationshipRule {
    Rule: RelationshipType;
    Optional: boolean;
}