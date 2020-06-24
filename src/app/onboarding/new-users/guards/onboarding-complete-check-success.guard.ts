import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OnboardingNewUsersService } from '../services/onboarding-new-users.service';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';
import { RelationShipService } from 'src/app/account/relationships/services/relationship.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingCompleteCheckSuccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private relationshipService: RelationShipService,
    private onboardingService: OnboardingNewUsersService,
    private onboardingStateService: OnboardingNewUsersStateService
  ) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const registration = this.onboardingStateService.currentRegisterModel;
      const onboardingRequest = this.onboardingStateService.currentOnboardingRequest;
      // manually assign these values everytime as they might get wiped out
      registration.collectGroupId = onboardingRequest.collectGroupId;
      // using a promise here for readability in the beginning
      await this.onboardingService.createUser(registration).toPromise();
      // retrieve the current relationships
      const relationships = await this.relationshipService.get(registration.organisationId).toPromise();
      // get the distinct providing organisation ids
      const providingOrganisations = [...new Set(relationships.map(x => x.ProvidingOrganisationId))];
      // map them to promises and notify the providing organisations
      const toExecuteCalls = providingOrganisations.map(x => this.relationshipService.notify(registration.organisationId, x))
      
      await Promise.all(toExecuteCalls);

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
    return true;
  }

  private HandleFailure(next: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/system/error-page'], {
      queryParams: next.queryParams
    });

    return false;
  }
}
