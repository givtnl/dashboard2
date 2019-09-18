import { OnboardingBankAccountService } from '../services/onboarding-bank-account.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {OnboardingBankAccountRegistrationResponseModel} from '../models/onboarding-bank-account-registration-response.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountRegistrationResolver implements Resolve<OnboardingBankAccountRegistrationResponseModel> {
  /**
   *
   */
  constructor(private service: OnboardingBankAccountService, private applicationStateService: ApplicationStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | OnboardingBankAccountRegistrationResponseModel
    | Observable<OnboardingBankAccountRegistrationResponseModel>
    | Promise<OnboardingBankAccountRegistrationResponseModel> {
    return this.service.getRegistrationStatus(this.applicationStateService.currentTokenModel.OrganisationAdmin);
  }
}
