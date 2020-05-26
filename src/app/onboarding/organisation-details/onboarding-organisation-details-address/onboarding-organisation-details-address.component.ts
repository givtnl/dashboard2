import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { postCodeBACSValidator } from 'src/app/shared/validators/postcode-BACS.validator';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
  selector: 'app-onboarding-organisation-details-address',
  templateUrl: './onboarding-organisation-details-address.component.html',
  styleUrls: ['./onboarding-organisation-details-address.component.scss']
})
export class OnboardingOrganisationDetailsAddressComponent implements OnInit {

  public form: FormGroup
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private onboardingStateService: OnboardingOrganisationDetailsStateService,
    private router: Router,
    private translationService: TranslateService
  ) { }

  ngOnInit() {
    var address = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.AddressLine1
    var city = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.AddressLine3
    var postcode = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.PostalCode
    var country = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Country

    this.form = this.formBuilder.group({
      address: [address ? address : null, [Validators.required, notNullOrEmptyValidator()]],
      city: [city ? city : null, [Validators.required, notNullOrEmptyValidator()]],
      postcode: [postcode ? postcode : null, ["GB", "GG", "GE"].some(x => x == country) ? [Validators.required, postCodeBACSValidator(), notNullOrEmptyValidator()] : [Validators.required, Validators.minLength(2), notNullOrEmptyValidator()]],
      country: [country ? country : null, [Validators.required, notNullOrEmptyValidator()]]
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
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const addressErrors = this.form.get('address').errors;
    const cityErrors = this.form.get('city').errors;
    const postcodeErrors = this.form.get('postcode').errors;
    const countryErrors = this.form.get('country').errors;

    if (addressErrors) {
      if (addressErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-required'));
      }
    }

    if (cityErrors) {
      if (cityErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-city-required'));
      }
    }
    
    if (postcodeErrors) {
      if (postcodeErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-zipcode-required'));
      }
      if (!postcodeErrors.required && postcodeErrors.invalidPostCode) {
        errorMessages.push(this.translationService.get('errorMessages.postcode-invalid'));
      }
    }

    if (countryErrors) {
      if (countryErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-country-required'));
      }
    }
    forkJoin(errorMessages)
      .pipe(tap(results => (resolvedErrorMessages = results)))
      .pipe(tap(results => console.log(results)))
      .pipe(switchMap(() => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );
  }
  continue() {
    var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
    currentOrganisationRegistrationDetailModel.AddressLine1 = this.form.value.address;
    currentOrganisationRegistrationDetailModel.AddressLine3 = this.form.value.city;
    currentOrganisationRegistrationDetailModel.PostalCode = this.form.value.postcode;
    currentOrganisationRegistrationDetailModel.Country = this.form.value.country;
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['charity-details'] } }])
  }
}
