import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';
import { RelationShipService as PreboardingRelationshipService } from '../services/relationship.service';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class PreboardingRelationShipProvidingOrganisationsResolver implements Resolve<OrganisationWithRulesDetail[]> {

    constructor(
        private preboardingRelationshipService: PreboardingRelationshipService) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): OrganisationWithRulesDetail[] | Observable<OrganisationWithRulesDetail[]> | Promise<OrganisationWithRulesDetail[]> {
        return this.preboardingRelationshipService.getAllRelationShipProvidingOrganisations()
            .pipe(catchError(error => of([])));
    }
}