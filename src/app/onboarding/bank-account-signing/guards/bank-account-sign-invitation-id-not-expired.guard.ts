import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BankAccountHolderService } from 'src/app/bank-account-holders/services/bank-account-holder.service';
import { OnboardingBankAccountSigningService } from '../services/onboarding-bank-account-signing.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountSignInvitationIdNotExpiredGuard implements CanActivate {
  constructor(private router: Router, private service: OnboardingBankAccountSigningService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!next.queryParams.invitationId || !next.queryParams.organisationId || !next.queryParams.accountId) {
      return this.HandleFailure(next);
    }
    try {
      const currentAccountHolder = await this.service
        .getToSignAccountHolder(next.queryParams.organisationId, next.queryParams.accountId, next.queryParams.invitationId)
        .toPromise();

      if (currentAccountHolder.InvitationIsExpired) {
        return this.HandleFailure(next, 'errorMessages.bankAccountHolderInvitationLinkExpired');
      }
      return true;
    } catch (error) {
      return this.HandleFailure(next);
    }
  }

  private HandleFailure(next: ActivatedRouteSnapshot, errorTerm: string = null): boolean {
    this.router.navigate(['system','root', { outlets: { 'system-outlet': ['error'] }} ], {
      queryParams: {
        error: errorTerm
      }
    });

    return false;
  }
}
