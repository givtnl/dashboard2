import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccountHolderListModel } from 'src/app/bank-account-holders/models/bank-account-holder-list.model';
import { InviteBankAccountHolderToSignMandateCommand } from '../../bank-account-holder/models/invite-bank-account-holder-to-sign-mandate.command';
import { OnboardingBankAccountHolderStateService } from '../../bank-account-holder/services/onboarding-bank-account-holder-state.service';

@Component({
    selector: 'app-onboarding-bank-account-invited-holders',
    templateUrl: './onboarding-bank-account-invited-holders.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-invited-holders.component.scss']
})
export class OnboardingBankAccountInvitedHoldersComponent implements OnInit {

    public accountHolders = new Array<BankAccountHolderListModel>();

    constructor(private activatedRoute: ActivatedRoute,
        private onboardingAccountHolderSateService: OnboardingBankAccountHolderStateService,
        private router: Router) { }

    ngOnInit() {
        this.accountHolders = this.activatedRoute.snapshot.data.accountHolders;
    }

    changeResendClick() {
        const accountHolder: InviteBankAccountHolderToSignMandateCommand = {
            emailAddress: this.accountHolders[0].EmailAddress,
            firstName: this.accountHolders[0].FirstName,
            lastName: this.accountHolders[0].LastName,
            sendInvitationEmail: true
        }
        this.onboardingAccountHolderSateService.currentInvitationModel = accountHolder;
        this.router.navigate(['/', 'onboarding', 'bank-account-holder', { outlets: { 'onboarding-outlet': ['who'] } }], { queryParams: { existing: this.accountHolders[0].Id } });
    }
}
