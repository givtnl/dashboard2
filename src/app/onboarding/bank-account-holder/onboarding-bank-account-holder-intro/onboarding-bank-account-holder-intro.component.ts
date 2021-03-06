import { Component, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Component({
    selector: 'app-onboarding-bank-account-holder-intro',
    templateUrl: './onboarding-bank-account-holder-intro.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-holder-intro.component.scss']
})
export class OnboardingBankAccountHolderIntroComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        mixpanel.track("accountHolderAdd:begin");
    }
}
