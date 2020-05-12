import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';

@Component({
  selector: 'app-onboarding-organisation-details-charity-details',
  templateUrl: './onboarding-organisation-details-charity-details.component.html',
  styleUrls: ['./onboarding-organisation-details-charity-details.component.scss']
})
export class OnboardingOrganisationDetailsCharityDetailsComponent implements OnInit {
  public form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private onboardingStateService: OnboardingOrganisationDetailsStateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      regulator: [null, [Validators.required]],
      referenceWithRegulator: [null, [Validators.required]],
      referenceWithParent: [null, [Validators.required]],
      referenceWithHMRC: [null, [Validators.required]]
    })
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
  }
  handleInvalidForm() {

  }
  continue() {
    var currentOrganisationRegistrationDetailModel: CurrentOrganisationRegistrationDetailsModel = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
    currentOrganisationRegistrationDetailModel.regulator = this.form.value.regulator;
    currentOrganisationRegistrationDetailModel.referenceWithRegulator = this.form.value.referenceWithRegulator;
    currentOrganisationRegistrationDetailModel.referenceWithParent = this.form.value.referenceWithParent;
    currentOrganisationRegistrationDetailModel.referenceWithHMRC = this.form.value.referenceWithHMRC;
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/','onboarding','organisation-details', { outlets: { 'onboarding-outlet': ['charity-details'] } }])
  }
}
