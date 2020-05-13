import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';

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
    var address = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.AddressLine1
    var city = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.AddressLine3
    var postcode = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.PostalCode
    var country = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Country

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
    var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
    currentOrganisationRegistrationDetailModel.AddressLine1 = this.form.value.address;
    currentOrganisationRegistrationDetailModel.AddressLine3 = this.form.value.city;
    currentOrganisationRegistrationDetailModel.PostalCode = this.form.value.postcode;
    currentOrganisationRegistrationDetailModel.Country = this.form.value.country;
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/','onboarding','organisation-details', { outlets: { 'onboarding-outlet': ['charity-details'] } }])
  }
}
