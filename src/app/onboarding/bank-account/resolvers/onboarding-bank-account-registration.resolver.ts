import { OnboardingBankAccountService } from '../services/onboarding-bank-account.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {OnboardingBankAccountRegistrationResponseModel} from '../models/onboarding-bank-account-registration-response.model';
import { Injectable } from '@angular/core';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { ToastrService } from 'ngx-toastr';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountRegistrationResolver implements Resolve<OnboardingBankAccountRegistrationResponseModel> {
  /**
   *
   */
  constructor(private service: OnboardingBankAccountService,private toastr: TranslatableToastrService, private applicationStateService: ApplicationStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | OnboardingBankAccountRegistrationResponseModel
    | Observable<OnboardingBankAccountRegistrationResponseModel>
    | Promise<OnboardingBankAccountRegistrationResponseModel> {
    return this.service.getRegistrationStatus(this.applicationStateService.currentTokenModel.OrganisationAdmin)
    .pipe(catchErrorStatus(404, (error) => this.toastr.warning('errorMessages.generic-error-title','errorMessages.generic-error-message')));
  }
}
