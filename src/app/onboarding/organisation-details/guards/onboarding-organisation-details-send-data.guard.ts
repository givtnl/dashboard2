import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsSendDataGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private onboardingOrganisationDetailsStateService: OnboardingOrganisationDetailsStateService,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService,
    private applicationStateService: ApplicationStateService
  ) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      var updateOrganisationCommand = this.onboardingOrganisationDetailsStateService.currentEditedOrganisationCharityCommisionCommand;
      var organisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;
      await this.onboardingOrganisationDetailsService.put(organisationId, updateOrganisationCommand).toPromise();
      return true;
    } catch (error) {
      await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message');
      return false;
    }
  }
}
