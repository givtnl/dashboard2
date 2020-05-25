import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';

@Component({
  selector: 'app-onboarding-organisation-details-intro',
  templateUrl: './onboarding-organisation-details-intro.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-intro.component.scss']
})
export class OnboardingOrganisationDetailsIntroComponent {
  constructor(private router: Router, private service: OnboardingOrganisationDetailsStateService) { }
  
  gotoManualEntry() {
    this.service.isManualRegistration = true
    this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['verify-organisation-name'] } }], {
      queryParamsHandling: 'merge'
    })
  }

}
