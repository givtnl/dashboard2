import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectDebitType } from 'src/app/shared/enums/direct-debit.type';
import { DirectDebitTypeHelper } from 'src/app/shared/helpers/direct-debit-type.helper';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';
import mixpanel from 'mixpanel-browser';

@Component({
    selector: 'app-onboarding-bank-account-intro',
    templateUrl: './onboarding-bank-account-intro.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-intro.component.scss']
})
export class OnboardingBankAccountIntroComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        mixpanel.track("bankAccountAdd:begin");
    }

    startBankAccount() {
        const currentOrganisation = this.route.parent.snapshot.data.currentOrganisation as OrganisationDetailModel;
        if (DirectDebitTypeHelper.fromOrganisationDetailModel(currentOrganisation) == DirectDebitType.SEPA)
            this.router.navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['add-sepa'] } }], {
                queryParamsHandling: 'merge'
            });
        else 
            this.router.navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['add'] } }], {
                queryParamsHandling: 'merge'
            });
    }
}
