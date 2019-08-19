import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingStateService } from '../services/onboarding-state.service';

@Injectable ({
    providedIn: 'root'
})
export class OnboardingRegisterGuard implements CanActivate {
    
    constructor(private router: Router, private onboardingStateService: OnboardingStateService){

    }
    
    canActivate(): boolean {
        console.log("onboarding register guard")
        if (this.onboardingStateService.currentOnboardingRequest)
            return true
        else {
            return false
        }
    }
}