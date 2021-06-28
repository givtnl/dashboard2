import { Component, OnInit } from '@angular/core';
import mixpanel from 'mixpanel-browser';

@Component({
    selector: 'app-onboarding-organisation-details-complete',
    templateUrl: './onboarding-organisation-details-complete.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-complete.component.scss']
})
export class OnboardingOrganisationDetailsCompleteComponent implements OnInit {

    constructor() { }
    
    ngOnInit(): void {
        mixpanel.track('organisationDetails:end');
    }
}
