import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingUserRegistrationOrganisationResolver implements Resolve<OrganisationDetailModel> {
  /**
   *
   */
  constructor(
    private stateService: OnboardingNewUsersStateService,
    private organisationService: OrganisationsService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): OrganisationDetailModel | Observable<OrganisationDetailModel> | Promise<OrganisationDetailModel> {
    const currentOnboardingRequest = this.stateService.currentPreparationModel;
    return this.organisationService
      .getById(currentOnboardingRequest.OrganisationId)
      .pipe(catchErrorStatus(401, () => this.router.navigate(['/', 'system-module', 'not-found'])));
  }
}
