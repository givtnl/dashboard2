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
    var address = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.address
    var city = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.city
    var postcode = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.postcode
    var country = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.country

    this.form = this.formBuilder.group({
      address: [address ? address : null, [Validators.required]],
      city: [city ? city : null, [Validators.required]],
      postcode: [postcode ? postcode : null, [Validators.required]],
      country: [country ? country : null, [Validators.required]]
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
