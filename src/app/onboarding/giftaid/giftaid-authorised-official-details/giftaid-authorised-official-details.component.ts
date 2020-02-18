import { Component, OnInit } from '@angular/core';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
  selector: 'app-giftaid-authorised-official-details',
  templateUrl: './giftaid-authorised-official-details.component.html',
  styleUrls: ['../../onboarding.module.scss','./giftaid-authorised-official-details.component.scss']
})
export class GiftaidAuthorisedOfficialDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private giftAidStateService: OnboardingGiftAidStateService, private toastr:ToastrService, private translationService:TranslateService,) { }

  ngOnInit() {
    const currentSettings = this.getCachedValue();
    this.form = this.fb.group({
      authorisedOfficialFirstName: [
        currentSettings ? currentSettings.authorisedOfficialFirstName : null,
        [Validators.required, notNullOrEmptyValidator()]
      ],
      authorisedOfficialMiddleName: [currentSettings ? currentSettings.authorisedOfficialMiddleName : null],
      authorisedOfficialLastName: [currentSettings ? currentSettings.authorisedOfficialLastName : null, [Validators.required,notNullOrEmptyValidator()]],
      authorisedOfficialPhoneNumber: [currentSettings ? currentSettings.authorisedOfficialPhoneNumber : null, [Validators.required,notNullOrEmptyValidator()]]
    }, { updateOn: 'submit' });
  }

  private getCachedValue(): CreateGiftAidSettingsCommand {
    if (this.giftAidStateService.validatedAndCompletedStepFour) {
      return this.giftAidStateService.currentGiftAidSettings;
    }
    return null;
  }

  public submit():void{
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

    const firstNameErrors = this.form.get('authorisedOfficialFirstName').errors;
    const lastNameErrors = this.form.get('authorisedOfficialLastName').errors;
    const phoneNumberErrors = this.form.get('authorisedOfficialPhoneNumber').errors;

    if (firstNameErrors)
      if (firstNameErrors.trimEmptyValue || firstNameErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.first-name-required'));
    
    if (lastNameErrors)
      if (lastNameErrors.trimEmptyValue || lastNameErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.last-name-required'));
    
    if (phoneNumberErrors)
      if (phoneNumberErrors.trimEmptyValue || phoneNumberErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.phone-number-required'));
    

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
    currentSettings.authorisedOfficialFirstName = this.form.value.authorisedOfficialFirstName;
    currentSettings.authorisedOfficialMiddleName = this.form.value.authorisedOfficialMiddleName;
    currentSettings.authorisedOfficialLastName = this.form.value.authorisedOfficialLastName;
    currentSettings.authorisedOfficialPhoneNumber = this.form.value.authorisedOfficialPhoneNumber;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepFour = true;
    this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['authorised-official-identification-details'] } }]);
  }
}
