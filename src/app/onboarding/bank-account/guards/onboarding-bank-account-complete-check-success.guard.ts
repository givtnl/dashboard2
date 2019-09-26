import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OnboardingBankAccountService } from '../services/onboarding-bank-account.service';
import { OnboardingBankAccountStateService } from '../services/onboarding-bank-account-state.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountCompleteCheckSuccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private collectGroupService: CollectGroupsService,
    private applicationStateService: ApplicationStateService,
    private onboardingBankAccountService: OnboardingBankAccountService,
    private onboardingBankAccountStateService: OnboardingBankAccountStateService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const registration = this.onboardingBankAccountStateService.currentBankAccountModel;
      const currentToken = this.applicationStateService.currentTokenModel;

      // create the bank account
      const createdResponse = await this.onboardingBankAccountService.create(currentToken.OrganisationAdmin, registration).toPromise();
      // retrieve the collectgroups
      const collectGroups = await this.collectGroupService.getAll(currentToken.OrganisationAdmin).toPromise();

      // if there is only one collect group, it means its the default, link it with this account we just created
      if (collectGroups && collectGroups.length === 1 && !collectGroups[0].AccountId) {
        await this.collectGroupService.addAccountToCollectGroup(
          currentToken.OrganisationAdmin,
          createdResponse.Result,
          collectGroups[0].Id
        ).toPromise();
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status !== 422) {
        return this.HandleFailure(next);
      }
      return false;
    }
    return true;
  }

  private HandleFailure(next: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/system/error-page'], {
      queryParams: next.queryParams
    });

    return false;
  }
}
