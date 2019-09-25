import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OnboardingBankAccountHolderStateService } from '../services/onboarding-bank-account-holder-state.service';
import { OnboardingBankAccountService } from '../../bank-account/services/onboarding-bank-account.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { OnboardingBankAccountHolderService } from '../services/onboarding-bank-account-holder.service';
import { switchMap, map } from 'rxjs/operators';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class OnlyOneActiveBankAccountGuard implements CanActivate {
  constructor(
    private router: Router,
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
