import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import mixpanel from 'mixpanel-browser';
import { AddBankAccountToOrganisationCommand } from '../models/add-bank-account-to-organisation.command';
import { OnboardingBankAccountStateService } from '../services/onboarding-bank-account-state.service';

@Component({
    selector: 'app-onboarding-bank-account-completed',
    templateUrl: './onboarding-bank-account-completed.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-completed.component.scss']
})
export class OnboardingBankAccountCompletedComponent implements OnInit, OnDestroy {


    constructor(private router: Router, private stateService: OnboardingBankAccountStateService) { }

    accountName: string;
    sortCode: string;
    accountNumber: string;
    iban: string

    ngOnInit() {
        mixpanel.track("bankAccountAdd:end");
        const currentBankDetails = this.stateService.currentBankAccountModel as AddBankAccountToOrganisationCommand;
        this.accountName = currentBankDetails.accountName ? currentBankDetails.accountName : '';
        this.sortCode = currentBankDetails.sortCode ? currentBankDetails.sortCode : '';
        this.accountNumber = currentBankDetails.accountNumber ? currentBankDetails.accountNumber : '';
        this.iban = currentBankDetails.iban ? currentBankDetails.iban : '';
    }

    ngOnDestroy(): void {
        this.stateService.clear();
    }
}
