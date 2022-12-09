import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import mixpanel from 'mixpanel-browser';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { environment } from 'src/environments/environment';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';

@Component({
    selector: 'app-onboarding-completed',
    templateUrl: './onboarding-completed.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-completed.component.scss']
})
export class OnboardingCompletedComponent implements OnInit {
    public redirectUrl = environment.oldDashboardUrl;

    public currentOrganisation: OrganisationDetailModel;

    constructor(private route: ActivatedRoute, private stateService: OnboardingNewUsersStateService, private dashboardService: DashboardService) { }

    ngOnInit(): void {
        mixpanel.track("onboarding:end");
        this.redirectUrl = this.dashboardService.getOldDashboardUrl();
        this.currentOrganisation = this.route.snapshot.data.organisation;
        this.stateService.clear();
    }
}
