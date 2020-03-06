import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BankAccountService } from 'src/app/bank-accounts/services/bank-account.service';
import { BankAccountListModel } from 'src/app/bank-accounts/models/bank-account-list.model';
import { BankAccountActiveStatusFilter, BankAccountPrimaryStatusFilter, BankAccountVerificationStatusFilter } from 'src/app/bank-accounts/models/bank-account-filter.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountHolderAccountResolver implements Resolve<BankAccountListModel> {
  /**
   *
   */
  constructor(private service: BankAccountService, private applicationStateService: ApplicationStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): BankAccountListModel | Observable<BankAccountListModel> | Promise<BankAccountListModel> {
    return this.service
      .getAccounts(this.applicationStateService.currentTokenModel.OrganisationAdmin, {
        activeFilter: BankAccountActiveStatusFilter.Active,
        primaryFilter: BankAccountPrimaryStatusFilter.Primary,
        verifiedFilter: BankAccountVerificationStatusFilter.Verified
      })
      .pipe(map(bankAccounts => bankAccounts[0]));
  }
}
