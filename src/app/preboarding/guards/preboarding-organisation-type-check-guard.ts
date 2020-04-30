import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { OrganisationType } from '../models/organisation-type.enum';

@Injectable({
    providedIn: 'root'
})
export class PreboardingOrganisationTypeCheckGuard implements CanActivate {
    constructor(private router: Router, private preboardingStateService: PreboardingStateService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const organisation = this.preboardingStateService.organisationDetails;

        if (organisation.type == OrganisationType.Church) {
            return true;
        } else {
            this.router.navigate(['/preboarding/register/organisation-admin-details']);
            return false;
        }
    }
}