import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-organisation-details-intro',
  templateUrl: './onboarding-organisation-details-intro.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-intro.component.scss']
})
export class OnboardingOrganisationDetailsIntroComponent {
  constructor(
    private router: Router) { }

  public gotoNextStep() {
    this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['verify-organisation-name'] } }])

  }
}
