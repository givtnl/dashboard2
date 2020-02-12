import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-giftaid-organisation-address-details',
  templateUrl: './giftaid-organisation-address-details.component.html',
  styleUrls: ['../../onboarding.module.scss','./giftaid-organisation-address-details.component.scss']
})
export class GiftaidOrganisationAddressDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private translationService:TranslateService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService
  ) {}

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.fb.group({
      charityAddressLineOne: [this.currentSettings ? currentSettings.charityAddressLineOne : null, [Validators.required]],
      charityAddressLineTwo: [this.currentSettings ? currentSettings.charityAddressLineTwo : null, [Validators.required]],
      charityAddressLineThree: [this.currentSettings ? currentSettings.charityAddressLineThree : null],
      charityAddressLineFour: [this.currentSettings ? currentSettings.charityAddressLineFour : null],
      charityAddressZipCode: [this.currentSettings ? currentSettings.charityAddressZipCode : null, [Validators.required]],
      charityAddressCountry: [{
       value: this.currentSettings ? currentSettings.charityAddressCountry : null,
       disabled: true
      }, [Validators.required]]
    },{updateOn:'submit'});
  }

  private currentSettings(): PreparedGiftAidSettings {
    // if we already did this step and the user returns to this screen, then load the previously entered settings
    // and do not reload them from our prepare endpoint as the user might altered them
    if (!this.giftAidStateService.validatedAndCompletedStepThree) {
      return this.activatedRoute.parent.snapshot.data.giftAidSettings;
    } else {
      return this.giftAidStateService.currentGiftAidSettings;
    }
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

    const addressLine1Errors = this.form.get('charityAddressLineOne').errors;
    const addressLine2Errors = this.form.get('charityAddressLineTwo').errors;
    const addressZipCodeErrors = this.form.get('charityAddressZipCode').errors;
    const addressCountryErrors = this.form.get('charityAddressCountry').errors;

    if (addressLine1Errors && addressLine1Errors.required) {
      errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (addressLine2Errors && addressLine1Errors.required) {
      errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (addressZipCodeErrors && addressZipCodeErrors.required) {
      errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
    }
    if (addressCountryErrors && addressCountryErrors.required) {
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
    currentSettings.charityAddressLineOne = this.form.value.charityAddressLineOne;
    currentSettings.charityAddressLineTwo = this.form.value.charityAddressLineTwo;
    currentSettings.charityAddressLineThree = this.form.value.charityAddressLineThree;
    currentSettings.charityAddressLineFour = this.form.value.charityAddressLineFour;
    currentSettings.charityAddressZipCode = this.form.value.charityAddressZipCode;
    currentSettings.charityAddressCountry = this.form.getRawValue().charityAddressCountry;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepThree = true;
    // todo implement the route
    this.router.navigate(['/', 'onboarding','giftaid', {outlets: {'onboarding-outlet': ['authorised-official-details']}}]);
  }
}
