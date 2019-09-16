import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';



@Injectable({
    providedIn: 'root'
})
export class OnboardingRegisterCheckPasswordGuard implements CanActivate {
    constructor(private router: Router, private onboardingStateService: OnboardingNewUsersStateService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const registration = this.onboardingStateService.currentRegisterModel;
        const preparationModel = this.onboardingStateService.currentPreparationModel;

        const passwordIsRequired = preparationModel.RequiredInputs.some(x => x === 'Password');

        if ((passwordIsRequired && registration.password && registration.password.length > 1) || !passwordIsRequired) {
            return true;
        } else {
            console.error('Failed to satisfy the onboardingcheckpassword guard');
            this.router.navigate(['/onboarding/welcome'], {
                queryParams: next.queryParams
            });
            return false;
        }
    }
}
