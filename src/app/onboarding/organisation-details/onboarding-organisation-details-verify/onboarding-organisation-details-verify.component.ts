import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';

@Component({
  selector: 'app-onboarding-organisation-details-verify',
  templateUrl: './onboarding-organisation-details-verify.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-verify.component.scss']
})
export class OnboardingOrganisationDetailsVerifyComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public organisationDetails: CharityCommisionOrganisationDetailModel;

  constructor(private formBuilder: FormBuilder, private router: Router, public stateService: OnboardingOrganisationDetailsStateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    this.organisationDetails = this.stateService.currentOrganisationCharityCommisionModel;

    this.form.valueChanges.subscribe(answer => {
      this.loading = true;
      this.router
        .navigate(
          [
            '/',
            'onboarding',
            'organisation-details',
            { outlets: { 'onboarding-outlet': [answer.detailsCorrect ? 'complete' : 'incorrect'] } }
          ],
          {
            queryParamsHandling: 'merge'
          }
        )
        .finally(() => (this.loading = false));
    });
  }
}
