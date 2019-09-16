import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';


@Injectable({
    providedIn: 'root'
})
export class OnboardingRegisterGuard implements CanActivate {
    constructor(private router: Router, private onboardingStateService: OnboardingNewUsersStateService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const registration = this.onboardingStateService.currentRegisterModel;

        if (registration && registration.email) {
            return true;
        } else {
            this.router.navigate(['/onboarding/welcome'], {
                queryParams: next.queryParams
            });
            console.error('Failed to satisfy the onboardingregister guard');
            return false;
        }
    }
}
