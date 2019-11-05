import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Component({
  selector: 'app-onboarding-organisation-details-intro',
  templateUrl: './onboarding-organisation-details-intro.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-intro.component.scss']
})
export class OnboardingOrganisationDetailsIntroComponent implements OnInit {

  public contractUrl: String;

  constructor( private applicationStateService: ApplicationStateService) { 
  }

  ngOnInit() {
    this.contractUrl =`${environment.apiUrl}/contract/organisations/${this.applicationStateService.currentTokenModel.OrganisationAdmin}`;
  }
}
