import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OnboardingBankAccountHolderStateService } from '../services/onboarding-bank-account-holder-state.service';
import { OnboardingBankAccountService } from '../../bank-account/services/onboarding-bank-account.service';
import { OnboardingBankAccountHolderService } from '../services/onboarding-bank-account-holder.service';
import { BankAccountHolderService } from 'src/app/bank-account-holders/services/bank-account-holder.service';
import { UpdateBankAccountHolderCommand } from 'src/app/bank-account-holders/models/commands/update-bank-account-holder.command';

@Injectable({
    providedIn: 'root'
})
export class InviteBankAccountHolderCompleteCheckSuccessGuard implements CanActivate {
    constructor(
        private router: Router,
        private applicationStateService: ApplicationStateService,
        private bankAccountHolderService: BankAccountHolderService,
        private onboardingBankAccountService: OnboardingBankAccountHolderService,
        private onboardingBankAccountHolderStateService: OnboardingBankAccountHolderStateService
    ) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            const registration = this.onboardingBankAccountHolderStateService.currentInvitationModel;
            const currentBankAccount = this.onboardingBankAccountHolderStateService.currentBankAccountListModel;
            const currentToken = this.applicationStateService.currentTokenModel;

            if (next.queryParamMap.has("existing"))
            {
                const accountHolderId = next.queryParamMap.get("existing");
                const updateCommand: UpdateBankAccountHolderCommand = {
                    firstName: registration.firstName,
                    lastName: registration.lastName,
                    emailAddress: registration.emailAddress,
                    accountId: currentBankAccount.Id,
                    id: accountHolderId
                };
                await this.bankAccountHolderService.update(currentToken.OrganisationAdmin, updateCommand).toPromise();
                await this.onboardingBankAccountService.reInvite(currentToken.OrganisationAdmin, currentBankAccount.Id, accountHolderId).toPromise();
                this.onboardingBankAccountHolderStateService.clear();
            } else if (await this.onboardingBankAccountService.invite(currentToken.OrganisationAdmin, currentBankAccount.Id, registration).toPromise())
                this.onboardingBankAccountHolderStateService.clear();
            else
                this.HandleFailure(next);
        } catch (error) {
            if (error instanceof HttpErrorResponse) {
                return this.HandleFailure(next);
            }
        }

        this.onboardingBankAccountHolderStateService.clear();
        return true;
    }

    private HandleFailure(next: ActivatedRouteSnapshot): boolean {
        this.router.navigate(['/system/error-page'], {
            queryParams: next.queryParams
        });

        return false;
    }
}
