import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsFetchdataGuard implements CanActivate {
  constructor(
    private applicationStateService: ApplicationStateService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService
  ){
    
  }
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var charityNumber = this.onboardingOrganisationDetailsStateService.currentCharityNumber
    const createdResponse = await this.onboardingOrganisationDetailsService.get(charityNumber);   
    if(!isNullOrUndefined(createdResponse)) {
      // todo: save response to state
    }
    return true;
  }
}


