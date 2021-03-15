import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { RelationshipListModel } from 'src/app/account/relationships/models/relation-ship-list.model';
import { RelationshipType } from 'src/app/organisations/enums/relationship-type.model';
import { DirectDebitType } from 'src/app/shared/enums/DirectDebitType';

@Component({
    selector: 'app-onboarding-organisation-details-intro',
    templateUrl: './onboarding-organisation-details-intro.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-intro.component.scss']
})
export class OnboardingOrganisationDetailsIntroComponent implements OnInit {

    private relationshipRules: RelationshipListModel[];

    constructor(
        private router: Router, 
        private service: OnboardingOrganisationDetailsStateService, 
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.relationshipRules = this.route.snapshot.data.relationshipRules;
    }

    
    continue() {
        this.service.currentOrganisationRegistrationDetailsModel = {
            Id: this.route.snapshot.data.currentOrganisation.Guid,
            AddressLine1: "",
            AddressLine2: "",
            AddressLine3: "",
            AddressLine4: "",
            AddressLine5: "",
            Name: this.route.snapshot.data.currentOrganisation.Name,
            PostalCode: "",
            Country: this.route.snapshot.data.currentOrganisation.Country
        };
        if (this.relationshipRules && this.relationshipRules.some(rule => rule.Type == RelationshipType.UseRegulatorReference)
        || this.service.currentOrganisationFinancialType == DirectDebitType.SEPA)
            this.gotoManualEntry();
        else {
            this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['charity-number'] } }], {
                queryParamsHandling: 'merge'
            })
        } 
    }

    gotoManualEntry() {
        this.service.isManualRegistration = true
        this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['verify-organisation-name'] } }], {
            queryParamsHandling: 'merge'
        })
    }
}
