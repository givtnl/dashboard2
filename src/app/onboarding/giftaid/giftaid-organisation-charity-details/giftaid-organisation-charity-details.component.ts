import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { OnboardingOrganisationDetailsService } from '../../organisation-details/services/onboarding-organisation-details.service';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
  selector: 'app-giftaid-organisation-charity-details',
  templateUrl: './giftaid-organisation-charity-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './giftaid-organisation-charity-details.component.scss']
})
export class GiftaidOrganisationDetailsCharityNumberComponent implements OnInit {

  public form: FormGroup;
  public loading = false;
  public isInValidCharityCommissionReference = false;
  public isInValidCharityId = false;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService,
    private toastr: ToastrService,
    private translationService: TranslateService,
    private router: Router,
    private onboardingOrganisationDetailsService: OnboardingOrganisationDetailsService
  ) { }

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.formBuilder.group({

      charityCommissionReference: [
        { value: this.currentSettings ? currentSettings.charityCommissionReference : null, disabled: currentSettings && currentSettings.charityCommissionReference && currentSettings.charityCommissionReference.length > 0 }, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      charityId: [this.currentSettings ? currentSettings.charityId : null, [Validators.required, notNullOrEmptyValidator(), Validators.maxLength(20)]],
    }, {
      updateOn: 'submit'
    });
  }
  private currentSettings(): PreparedGiftAidSettings {
    // if we already did this step and the user returns to this screen, then load the previously entered settings
    // and do not reload them from our prepare endpoint as the user might altered them
    if (!this.giftAidStateService.validatedAndCompletedStepOne) {
      return this.activatedRoute.parent.snapshot.data.giftAidSettings;
    } else {
      return this.giftAidStateService.currentGiftAidSettings;
    }
  }

  public submit(): void {
    this.loading = true;

    // check if we have a valid charity commision number ( length and required )
    if (this.form.get('charityCommissionReference').valid) {
      // check our api if such a number exists
      this.onboardingOrganisationDetailsService.get(this.form.getRawValue().charityCommissionReference)
        .subscribe(success => {
          // we got a valid call from the database, the on complete handler will call the validate for us
          this.validate();
         }, error => {
           // we received an error in our api, mark this control as invalid
          this.form.get('charityCommissionReference').setErrors({
            invalid: true
          });
          // set loading to false as our oncomplete handler is not being called when errored
          this.loading = false;
        })
    }
    else {
      // the commision control is invalid, validate it among the rest of the form 
      this.validate();
    }
  }

  private validate(): void {
    if (this.form.invalid) {
      this.handleInvalidForm();
      this.loading = false;
      return;
    } else {
      this.continue();
    }
  }

  // only call this function when all of the input has been validated
  private continue(): void {
    const currentSettings = this.giftAidStateService.currentGiftAidSettings;
    currentSettings.charityCommissionReference = this.form.getRawValue().charityCommissionReference;
    currentSettings.charityId = this.form.getRawValue().charityId;
    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepOne = true;
    this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['organisation-details'] } }]);
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityCommisionNumberErrors = this.form.get('charityCommissionReference').errors;
    const charityIdErrors = this.form.get('charityId').errors;

    if (charityCommisionNumberErrors) {
      if (charityCommisionNumberErrors.invalidCharityNumber)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-not-found'));
      if (charityCommisionNumberErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
      if (charityCommisionNumberErrors.minlength)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-minLength'));
      if (charityCommisionNumberErrors.maxLength)
        errorMessages.push(this.translationService.get('errorMessages.charity-number-maxLength'));
    }

    if (charityIdErrors) {
      this.isInValidCharityId = charityCommisionNumberErrors && charityCommisionNumberErrors.required
      if (charityIdErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (charityIdErrors.trimEmptyValue)
        errorMessages.push(this.translationService.get('errorMessages.test'));
      if (charityIdErrors.maxLength)
        errorMessages.push(this.translationService.get('errorMessages.test'));
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
}
