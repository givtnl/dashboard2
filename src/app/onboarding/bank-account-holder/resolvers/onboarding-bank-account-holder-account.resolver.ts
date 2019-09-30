import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnboardingBankAccountHolderService } from '../services/onboarding-bank-account-holder.service';
import { map } from 'rxjs/operators';
import { BankAccountListModel } from '../models/bank-account-list.model';

@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountHolderAccountResolver implements Resolve<BankAccountListModel> {
  /**
   *
   */
  constructor(private service: OnboardingBankAccountHolderService, private applicationStateService: ApplicationStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | BankAccountListModel
    | Observable<BankAccountListModel>
    | Promise<BankAccountListModel> {
    return this.service.getAccounts(this.applicationStateService.currentTokenModel.OrganisationAdmin)
    .pipe(map(bankAccounts => bankAccounts[0]));
  }
}
