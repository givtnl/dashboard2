import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingBankAccountSigningService } from '../services/onboarding-bank-account-signing.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountSignInvitationAcceptedGuard implements CanActivate {
  constructor(private router: Router, private bankAccountSigningService: OnboardingBankAccountSigningService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!next.queryParams.invitationId || !next.queryParams.organisationId || !next.queryParams.accountId) {
      return this.HandleFailure(next);
    }

    try {
      await this.bankAccountSigningService
        .accept(next.queryParams.organisationId, next.queryParams.accountId, next.queryParams.invitationId)
        .toPromise();
      return true;
    } catch (error) {
      return this.HandleFailure(next);
    }
  }

  private HandleFailure(next: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/system/error-page'], {
      queryParams: next.queryParams
    });

    return false;
  }
}
