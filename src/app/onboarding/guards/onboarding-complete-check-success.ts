import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingStateService } from '../services/onboarding-state.service';
import { OnboardingService } from '../services/onboarding.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OnboardingCompleteCheckSuccessGuard implements CanActivate {
    constructor(private router: Router, private onboardingService: OnboardingService, private onboardingStateService: OnboardingStateService) {}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        const registration = this.onboardingStateService.currentRegisterModel;
        const onboardingRequest = this.onboardingStateService.currentOnboardingRequest;

        // manually assign these values everytime as they might get wiped out
        registration.collectGroupId = onboardingRequest.collectGroupId;
        // using a promise here for readability in the beginningngnging
        try {
            await this.onboardingService.createUser(registration).toPromise();
            return true;
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                switch (error.status) {
                    // claim or user already exists
                    case 409:
                        return true;
                    default:
                        return this.HandleFailure(next);
                }
            } else {
                return this.HandleFailure(next);
            }
        }
    }

    private HandleFailure(next: ActivatedRouteSnapshot): boolean {
        this.router.navigate(['/system/error-page'], {
            queryParams: next.queryParams
        });

        return false;
    }
}
