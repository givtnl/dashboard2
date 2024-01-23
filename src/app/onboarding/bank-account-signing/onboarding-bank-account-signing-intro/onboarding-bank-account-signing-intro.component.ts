import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import mixpanel from 'mixpanel-browser';
import { PaymentProvider } from '../models/payment-provider.enum';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';

@Component({
    selector: 'app-onboarding-bank-account-signing-intro',
    templateUrl: './onboarding-bank-account-signing-intro.component.html',
    styleUrls: ['../../onboarding.scss', './onboarding-bank-account-signing-intro.component.scss']
})
export class OnboardingBankAccountSigningIntroComponent implements OnInit {

    constructor(private stateService: OnboardingBankAccountSigningStateService, private route: ActivatedRoute) { }

    paymentProvider: PaymentProvider;

    ngOnInit() {
        const currentAccountHolder = this.route.parent.snapshot.data.bankAccountHolder;
        this.stateService.currentBankAccountHolderDetailModel = currentAccountHolder;
        this.paymentProvider = currentAccountHolder.PaymentProvider;
        mixpanel.identify(this.stateService.currentBankAccountHolderDetailModel.Id);
        mixpanel.track("accountHolderSign:begin");
    }
}
