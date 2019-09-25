import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OnboardingBankAccountService } from '../services/onboarding-bank-account.service';
import { OnboardingBankAccountStateService } from '../services/onboarding-bank-account-state.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountCompleteCheckSuccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private applicationStateService: ApplicationStateService,
    private onboardingBankAccountService: OnboardingBankAccountService,
    private onboardingBankAccountStateService: OnboardingBankAccountStateService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const registration = this.onboardingBankAccountStateService.currentBankAccountModel;
      const currentToken = this.applicationStateService.currentTokenModel;

     const createdAccountResponse = await this.onboardingBankAccountService.create(currentToken.OrganisationAdmin, registration).toPromise();
      
      this.onboardingBankAccountStateService.clear();
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return this.HandleFailure(next);
      }
    }

    this.onboardingBankAccountStateService.clear();
    return true;
  }

  private HandleFailure(next: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/system/error-page'], {
      queryParams: next.queryParams
    });

    return false;
  }
}
