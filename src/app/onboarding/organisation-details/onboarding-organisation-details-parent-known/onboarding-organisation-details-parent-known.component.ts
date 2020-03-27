import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';

@Component({
  selector: 'app-onboarding-organisation-details-parent-known',
  templateUrl: './onboarding-organisation-details-parent-known.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-parent-known.component.scss']
})
export class OnboardingOrganisationDetailsParentKnownComponent implements OnInit {
  constructor(private onboardingOrganisationDetailStateService: OnboardingOrganisationDetailsStateService, private applicationStateService: ApplicationStateService) {}

  public contractUrl: string;

  public loading = false;

  ngOnInit() {
    const charityCommissionReference = this.onboardingOrganisationDetailStateService.currentCharityNumber;
    this.contractUrl = `${environment.apiUrl}/contract/organisations/${this.applicationStateService.currentTokenModel.OrganisationAdmin}?charityCommissionReference=${charityCommissionReference}`;
  }
}
