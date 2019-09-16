import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';


@Injectable({
  providedIn: 'root'
})
export class OnboardingRegisterCheckPersonalDetailsRequiredGuard implements CanActivate {
  constructor(private router: Router, private onboardingStateService: OnboardingNewUsersStateService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const preparationModel = this.onboardingStateService.currentPreparationModel;

    const personalDetailsRequired = preparationModel.RequiredInputs.some(x => x === 'LastName' || x === 'FirstName');

    if (personalDetailsRequired) {
      return true;
    } else {
      console.error('Failed to satisfy the onboardingregistercheckpersonaldetails guard');
      this.router.navigate(['/', 'onboarding', 'welcome', 'new-users', { outlets: { 'onboarding-outlet': ['completed'] } }], {
        queryParams: next.queryParams
      });

      return false;
    }
  }
}
