import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
  selector: 'app-giftaid-authorised-official-address-details',
  templateUrl: './giftaid-authorised-official-address-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './giftaid-authorised-official-address-details.component.scss']
})
export class GiftaidAuthorisedOfficialAddressDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private giftAidStateService: OnboardingGiftAidStateService, private translationService: TranslateService, private toastr: ToastrService) { }

  ngOnInit() {
    const currentSettings = this.getCachedValue();
    this.form = this.fb.group({
      authorisedOfficialHomeAddressLineOne: [
        currentSettings ? currentSettings.authorisedOfficialHomeAddressLineOne : null,
        [Validators.required, notNullOrEmptyValidator()]
      ],
      authorisedOfficialHomeAddressLineTwo: [
        currentSettings ? currentSettings.authorisedOfficialHomeAddressLineTwo : null,
        [Validators.required, notNullOrEmptyValidator()]
      ],
      authorisedOfficialHomeAddressLineThree: [
        currentSettings ? currentSettings.authorisedOfficialHomeAddressLineThree : null,
        [Validators.required, notNullOrEmptyValidator()]
      ],
      authorisedOfficialHomeAddressLineZipCode: [currentSettings ? currentSettings.authorisedOfficialHomeAddressLineZipCode : null, [Validators.required, notNullOrEmptyValidator()]],
      authorisedOfficialHomeAddressLineCountry: [currentSettings ? currentSettings.authorisedOfficialHomeAddressLineCountry : null, [Validators.required, notNullOrEmptyValidator()]]
    });
  }

  private getCachedValue(): CreateGiftAidSettingsCommand {
    if (this.giftAidStateService.validatedAndCompletedStepThree) {
      return this.giftAidStateService.currentGiftAidSettings;
    }
    return null;
  }

  public submit(): void {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    } else {
      this.continue();
    }
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const addressLine1Errors = this.form.get('authorisedOfficialHomeAddressLineOne').errors;
    const addressLine2Errors = this.form.get('authorisedOfficialHomeAddressLineTwo').errors;
    const addressLine3Errors = this.form.get('authorisedOfficialHomeAddressLineThree').errors;
    const addressZipCodeErrors = this.form.get('authorisedOfficialHomeAddressLineZipCode').errors;
    const addressCountryErrors = this.form.get('authorisedOfficialHomeAddressLineCountry').errors;

    if (addressLine1Errors) {
      if (addressLine1Errors.trimEmptyValue)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (addressLine1Errors.required)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }

    if (addressLine2Errors) {
      if (addressLine2Errors.trimEmptyValue)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (addressLine2Errors.required)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (addressLine3Errors) {
      if (addressLine3Errors.trimEmptyValue)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (addressLine3Errors.required)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (addressZipCodeErrors) {
      if (addressZipCodeErrors.trimEmptyValue)
      errorMessages.push(this.translationService.get('errorMessages.test'));
      if (addressZipCodeErrors.required)
      errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (addressCountryErrors) {
      if (addressCountryErrors.trimEmptyValue)
      errorMessages.push(this.translationService.get('errorMessages.test'));
      if (addressCountryErrors.required)
      errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
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

  // only call this function when all of the input has been validated
  private continue(): void {
    const currentSettings = this.giftAidStateService.currentGiftAidSettings;

    currentSettings.authorisedOfficialHomeAddressLineOne = this.form.value.authorisedOfficialHomeAddressLineOne;
    currentSettings.authorisedOfficialHomeAddressLineTwo = this.form.value.authorisedOfficialHomeAddressLineTwo;
    currentSettings.authorisedOfficialHomeAddressLineThree = this.form.value.authorisedOfficialHomeAddressLineThree;
    currentSettings.authorisedOfficialHomeAddressLineZipCode = this.form.value.authorisedOfficialHomeAddressLineZipCode;
    currentSettings.authorisedOfficialHomeAddressLineCountry = this.form.value.authorisedOfficialHomeAddressLineCountry;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepThree = true;
    this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['verify-organisation-details'] } }]);
  }
}
