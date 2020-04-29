import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
  
export class PreboardingCompleteCheckSuccessGuard implements CanActivate {
    constructor(
        private router: Router,
        private preboardingStateService: PreboardingStateService
    ) {}
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            var info = JSON.stringify(this.preboardingStateService.currentAdditionalInformation);
            alert(info);
        } catch (error) {
            alert(error)
            return false;
        }
        return true;
    }
}