import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';

@Component({
  selector: 'app-onboarding-organisation-details-verify',
  templateUrl: './onboarding-organisation-details-verify.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-verify.component.scss']
})
export class OnboardingOrganisationDetailsVerifyComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public organisationDetails: OrganisationDetailModel;

  constructor(private formBuilder: FormBuilder, private router: Router, public stateService: OnboardingOrganisationDetailsStateService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    this.organisationDetails = this.stateService.currentOrganisationCharityCommisionModel;

    this.form.valueChanges.subscribe(answer => {
      this.loading = true;

      if (this.organisationDetails.AlreadyKnownParent === true) {
        this.setRouterPath(answer.detailsCorrect ? 'parent-known' : 'incorrect');
      }
      else {
        this.setRouterPath(answer.detailsCorrect ? 'complete' : 'incorrect');
      }
    });
  }

  setRouterPath(path: string) {
    this.router
      .navigate(
        [
          '/',
          'onboarding',
          'organisation-details',
          { outlets: { 'onboarding-outlet': [path] } }
        ],
        {
          queryParamsHandling: 'merge'
        }
      )
      .finally(() => (this.loading = false));
  }

  public checkboxStatusChangend(value: boolean) {

  }
}
