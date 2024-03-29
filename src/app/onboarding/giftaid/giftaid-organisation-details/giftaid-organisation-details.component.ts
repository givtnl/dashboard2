import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';

@Component({
  selector: 'app-giftaid-organisation-details',
  templateUrl: './giftaid-organisation-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './giftaid-organisation-details.component.scss']
})
export class GiftaidOrganisationDetailsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private translationService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService
  ) { }

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.fb.group({
      charityName: [this.currentSettings ? currentSettings.charityName : null, [Validators.required,notNullOrEmptyValidator()]],
      charityEmailAddress: [this.currentSettings ? currentSettings.charityEmailAddress : null, [Validators.required, Validators.email,notNullOrEmptyValidator()]],
      charityPhoneNumber: [this.currentSettings ? currentSettings.charityPhoneNumber : null, [Validators.required,notNullOrEmptyValidator()]]
    }, { updateOn: 'submit' });
  }

  private currentSettings(): PreparedGiftAidSettings {
    // if we already did this step and the user returns to this screen, then load the previously entered settings
    // and do not reload them from our prepare endpoint as the user might altered them
    if (!this.giftAidStateService.validatedAndCompletedStepTwo) {
      return this.activatedRoute.parent.snapshot.data.giftAidSettings;
    } else {
      return this.giftAidStateService.currentGiftAidSettings as PreparedGiftAidSettings;
    }
  }


  public submit(): void {
    if (this.form.invalid) {
        this.handleInvalidForm();
      return;
    } else {
      this.continue();
    }
  }

  // only call this function when all of the input has been validated
  private continue(): void {
    const currentSettings = this.giftAidStateService.currentGiftAidSettings;
    currentSettings.charityName = this.form.value.charityName;
    currentSettings.charityEmailAddress = this.form.value.charityEmailAddress;
    currentSettings.charityPhoneNumber = this.form.value.charityPhoneNumber;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepTwo = true;
    // todo implement the route
    this.router.navigate(['/', 'onboarding', 'giftaid', { outlets: { 'onboarding-outlet': ['organisation-address-details'] } }]);
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityNameErrors = this.form.get('charityName').errors;
    const charityEmailErrors = this.form.get('charityEmailAddress').errors;
    const charityPhoneErrors = this.form.get('charityPhoneNumber').errors;

    if (charityNameErrors)
      if (charityNameErrors.trimEmptyValue || charityNameErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.charity-name-required'));
    
    if (charityEmailErrors) {
      if (charityEmailErrors.trimEmptyValue || charityEmailErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.email-required'));
      if (charityEmailErrors.email)
        errorMessages.push(this.translationService.get('errorMessages.email-not-an-email'));
    }
    
    if (charityPhoneErrors)
      if (charityPhoneErrors.trimEmptyValue || charityPhoneErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.phone-number-required'));
    

    forkJoin(errorMessages)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(results => (resolvedErrorMessages = results)),
        switchMap(() => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
