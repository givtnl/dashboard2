import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BankAccountHolderListModel } from 'src/app/bank-account-holders/models/bank-account-holder-list.model';
import { BankAccountHolderService } from 'src/app/bank-account-holders/services/bank-account-holder.service';
import { BankAccountService } from 'src/app/bank-accounts/services/bank-account.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountInvitedHoldersResolver implements Resolve<BankAccountHolderListModel[]> {
  /**
   *
   */
  constructor(
    private bankAccountService: BankAccountService,
    private accountHolderService: BankAccountHolderService,
    private applicationStateService: ApplicationStateService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): BankAccountHolderListModel[] | Observable<BankAccountHolderListModel[]> | Promise<BankAccountHolderListModel[]> {
    return this.bankAccountService
      .getAccounts(this.applicationStateService.currentTokenModel.OrganisationAdmin)
      .pipe(
        switchMap(accounts =>
          this.accountHolderService.getByAccount(this.applicationStateService.currentTokenModel.OrganisationAdmin, accounts[0].Id)
        )
      );
  }
}
