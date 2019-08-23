import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingStateService } from '../services/onboarding-state.service';

@Injectable({
    providedIn: 'root'
})
export class OnboardingRegisterCheckPersonalDetailsRequiredGuard implements CanActivate {
    constructor(private router: Router, private onboardingStateService: OnboardingStateService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        const preparationModel = this.onboardingStateService.currentPreparationModel;

        const personalDetailsRequired = preparationModel.RequiredInputs.some(x => x === 'LastName' || x === 'FirstName');

        if (personalDetailsRequired) {
            return true;
        } else {
            this.router.navigate(['/','onboarding','completed'], {
                queryParams: next.queryParams
            });
            return false;
        }
    }
}