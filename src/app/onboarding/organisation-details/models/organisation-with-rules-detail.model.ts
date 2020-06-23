import { RelationshipRule } from 'src/app/organisations/models/relationship-rule.model';

export interface OrganisationWithRulesDetail {
    Id: string;
    Name: string;
    RelationshipRules: Array<RelationshipRule>;
}