import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BankAccountHolderDetailModel } from '../models/bank-account-holder-detail.model';
import { OnboardingBankAccountSigningService } from '../services/onboarding-bank-account-signing.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountHolderDetailResolver implements Resolve<BankAccountHolderDetailModel> {
  /**
   *
   */
  constructor(private service: OnboardingBankAccountSigningService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): BankAccountHolderDetailModel | Observable<BankAccountHolderDetailModel> | Promise<BankAccountHolderDetailModel> {
    return this.service.getToSignAccountHolder(
      route.queryParams.organisationId,
      route.queryParams.accountId,
      route.queryParams.invitationId
    );
  }
}
