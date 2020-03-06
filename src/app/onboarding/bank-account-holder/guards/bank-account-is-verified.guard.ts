import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { BankAccountService } from 'src/app/bank-accounts/services/bank-account.service';
import { BankAccountActiveStatusFilter, BankAccountPrimaryStatusFilter, BankAccountVerificationStatusFilter } from 'src/app/bank-accounts/models/bank-account-filter.model';

@Injectable({
  providedIn: 'root'
})
export class BankAccountIsVerifiedGuard implements CanActivate {
  constructor(
    private toastr: TranslatableToastrService,
    private applicationStateService: ApplicationStateService,
    private bankAccountService: BankAccountService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var currentBankAccounts = await this.bankAccountService
      .getAccounts(this.applicationStateService.currentTokenModel.OrganisationAdmin, {
       activeFilter: BankAccountActiveStatusFilter.Active,
       primaryFilter: BankAccountPrimaryStatusFilter.Primary,
       verifiedFilter: BankAccountVerificationStatusFilter.All
      })
      .toPromise();

    // does this account require verification?
    const bankAccountsWithoutVerification = currentBankAccounts.filter(x => x.Verified === false);

    switch (bankAccountsWithoutVerification.length) {
      case 0:
        return true;
      default:
        await this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.no-bank-accounts-to-add-holder-to');
        return false;
    }
  }
}
