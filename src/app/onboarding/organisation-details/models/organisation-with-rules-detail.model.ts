import { RelationShipRule as RelationshipRule } from './relationship-rule.model';

export interface OrganisationWithRulesDetail {
    Id: string;
    Name: string;
    RelationshipRules: Array<RelationshipRule>;
}