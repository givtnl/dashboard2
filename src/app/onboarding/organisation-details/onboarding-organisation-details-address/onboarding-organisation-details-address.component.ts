import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';

@Component({
  selector: 'app-onboarding-organisation-details-address',
  templateUrl: './onboarding-organisation-details-address.component.html',
  styleUrls: ['./onboarding-organisation-details-address.component.scss']
})
export class OnboardingOrganisationDetailsAddressComponent implements OnInit {

  public form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private onboardingStateService: OnboardingOrganisationDetailsStateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      postcode: [null, [Validators.required]],
      country: [null, [Validators.required]]
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
    currentOrganisationRegistrationDetailModel.address = this.form.value.address;
    currentOrganisationRegistrationDetailModel.city = this.form.value.city;
    currentOrganisationRegistrationDetailModel.postcode = this.form.value.postcode;
    currentOrganisationRegistrationDetailModel.country = this.form.value.country;
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/','onboarding','organisation-details', { outlets: { 'onboarding-outlet': ['charity-details'] } }])
  }
}
