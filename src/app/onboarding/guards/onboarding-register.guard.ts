import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingStateService } from '../services/onboarding-state.service';

@Injectable ({
    providedIn: 'root'
})
export class OnboardingRegisterGuard implements CanActivate {
    
    constructor(private router: Router, private onboardingStateService: OnboardingStateService){}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        let registration = this.onboardingStateService.currentRegisterModel
        if (registration && registration.email && registration.password)
            return true
        else {
            this.router.navigate(['/onboarding/welcome'], { queryParams: next.queryParams})
            return false
        }
    }
}