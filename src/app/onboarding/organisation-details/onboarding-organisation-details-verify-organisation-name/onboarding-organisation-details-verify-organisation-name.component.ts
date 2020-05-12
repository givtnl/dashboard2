import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onboarding-organisation-details-verify-organisation-name',
  templateUrl: './onboarding-organisation-details-verify-organisation-name.component.html',
  styleUrls: ['./onboarding-organisation-details-verify-organisation-name.component.scss']
})
export class OnboardingOrganisationDetailsVerifyOrganisationNameComponent implements OnInit {

  public form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private onboardingStateService: OnboardingOrganisationDetailsStateService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    var organisationName = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.organisationName;

    this.form = this.formBuilder.group({
      organisationName: [organisationName ? organisationName : null, [Validators.required]]
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
    var currentOrganisationRegistrationDetailModel: CurrentOrganisationRegistrationDetailsModel = this.onboardingStateService.currentOrganisationRegistrationDetailsModel || Object()
    currentOrganisationRegistrationDetailModel.organisationName = this.form.value.organisationName
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/','onboarding','organisation-details', { outlets: { 'onboarding-outlet': ['address-details'] } }])
  }
}
