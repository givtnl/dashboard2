import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';
import { PreboardingRelationShipService as PreboardingRelationshipService } from '../services/preboarding-relationship.service';


@Injectable({
    providedIn: 'root'
})
export class PreboardingRelationShipProvidingOrganisationsResolver implements Resolve<OrganisationWithRulesDetail[]> {

    constructor(
        private preboardingRelationshipService: PreboardingRelationshipService ) {
    }   

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): OrganisationWithRulesDetail[] | Observable<OrganisationWithRulesDetail[]> | Promise<OrganisationWithRulesDetail[]> {
        return this.preboardingRelationshipService.getAllRelationShipProvidingOrganisations();
    }
}