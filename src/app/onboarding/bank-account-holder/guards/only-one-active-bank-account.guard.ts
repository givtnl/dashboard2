import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OnboardingBankAccountHolderService } from '../services/onboarding-bank-account-holder.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyOneActiveBankAccountGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private applicationStateService: ApplicationStateService,
    private onboardingBankAccountHolderService: OnboardingBankAccountHolderService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var currentBankAccounts = await this.onboardingBankAccountHolderService
      .getAccounts(this.applicationStateService.currentTokenModel.OrganisationAdmin)
      .toPromise();

    switch (currentBankAccounts.length) {
      case 0:
        await this.toastr.warning('errorMessages.generic-error-title','errorMessages.no-bank-accounts-to-add-holder-to');
        return false;
      case 1:
        return true;
      default:
        await this.toastr.warning('errorMessages.generic-error-title','errorMessages.too-many-bank-accounts-to-add-holder-to');
        return false;
    }
  }
}
