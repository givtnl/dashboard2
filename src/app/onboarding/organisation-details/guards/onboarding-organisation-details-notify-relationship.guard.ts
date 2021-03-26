import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RelationShipService } from 'src/app/account/relationships/services/relationship.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
    providedIn: 'root'
})
/**
 * Updates the Organisation based on details from the Charity Commission API
 */
export class OnboardingOrganisationDetailsNotifyRelationshipGuard implements CanActivate {
    constructor(
        private relationshipService: RelationShipService,
        private applicationStateService: ApplicationStateService
    ) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            let organisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;
            // retrieve the current relationships
            const relationships = await this.relationshipService.get(organisationId).toPromise();
            // get the distinct providing organisation ids
            const providingOrganisations = [...new Set(relationships.map(x => x.ProvidingOrganisationId))];
            // map them to promises and notify the providing organisations
            const toExecuteCalls = providingOrganisations.map(x => this.relationshipService.notify(organisationId, x).toPromise());

            await Promise.all(toExecuteCalls);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
