import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { tap, switchMap } from 'rxjs/operators';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { fixedLengthValidator } from 'src/app/shared/validators/fixed-length.validator';

@Component({
  selector: 'app-giftaid-authorised-official-identification-details',
  templateUrl: './giftaid-authorised-official-identification-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './giftaid-authorised-official-identification-details.component.scss']
})
export class GiftaidAuthorisedOfficialIdentificationDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private translationService: TranslateService, private toastr: ToastrService, private router: Router, private giftAidStateService: OnboardingGiftAidStateService) { }

  ngOnInit() {
    const currentSettings = this.getCachedValue();
    this.form = this.fb.group({
      nationalInsuranceNumber: [currentSettings ? currentSettings.nationalInsuranceNumber : null, [Validators.required, notNullOrEmptyValidator(), fixedLengthValidator(9)]],
      nationalIdentityCardNumber: [currentSettings ? currentSettings.nationalIdentityCardNumber : null, [Validators.required, notNullOrEmptyValidator()]]
    }, { updateOn: 'submit' });
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

    const insuranceNumberErrors = this.form.get('nationalInsuranceNumber').errors;
    const identityCardNumberErrors = this.form.get('nationalIdentityCardNumber').errors;

    if (insuranceNumberErrors) {
      if (insuranceNumberErrors.trimEmptyValue)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (insuranceNumberErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
      if (insuranceNumberErrors.fixedLength)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (identityCardNumberErrors) {
      if (identityCardNumberErrors.trimEmptyValue)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (identityCardNumberErrors.required)
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
    currentSettings.nationalInsuranceNumber = this.form.value.nationalInsuranceNumber;
    currentSettings.nationalIdentityCardNumber = this.form.value.nationalIdentityCardNumber;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepThree = true;
    // todo implement the route
    this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['authorised-official-address-details'] } }]);
  }
}
