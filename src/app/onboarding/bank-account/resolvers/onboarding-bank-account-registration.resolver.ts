import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { BankAccountService } from 'src/app/bank-accounts/services/bank-account.service';
import { BankAccountListModel } from 'src/app/bank-accounts/models/bank-account-list.model';
import { BankAccountActiveStatusFilter, BankAccountPrimaryStatusFilter, BankAccountVerificationStatusFilter } from 'src/app/bank-accounts/models/bank-account-filter.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingBankAccountRegistrationResolver implements Resolve<BankAccountListModel> {
    /**
     *
     */
    constructor(private service: BankAccountService, private toastr: TranslatableToastrService, private applicationStateService: ApplicationStateService) { }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<BankAccountListModel> {
        var accounts = await this.service.getAccounts(this.applicationStateService.currentTokenModel.OrganisationAdmin,
            {
                activeFilter: BankAccountActiveStatusFilter.Active,
                primaryFilter: BankAccountPrimaryStatusFilter.Primary,
                verifiedFilter: BankAccountVerificationStatusFilter.All
            })
            .pipe(catchErrorStatus(404, (error) => this.toastr.warning('errorMessages.generic-error-title', 'errorMessages.generic-error-message')))
            .toPromise();
        if (accounts.length > 0)
            return accounts[0];
        return null;
    }
}
