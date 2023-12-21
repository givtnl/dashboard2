import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { notNullOrEmptyValidator } from 'src/app/shared/validators/notnullorempty.validator';
import { postCodeBACSValidator } from 'src/app/shared/validators/postcode-BACS.validator';

@Component({
  selector: 'app-giftaid-organisation-address-details',
  templateUrl: './giftaid-organisation-address-details.component.html',
  styleUrls: ['../../onboarding.scss','./giftaid-organisation-address-details.component.scss']
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
      charityAddressLineOne: [currentSettings ? currentSettings.charityAddressLineOne : null, [Validators.required,notNullOrEmptyValidator()]],
      charityAddressLineTwo: [currentSettings ? currentSettings.charityAddressLineTwo : null, [Validators.required,notNullOrEmptyValidator()]],
      charityAddressLineThree: [currentSettings ? currentSettings.charityAddressLineThree : null],
      charityAddressLineFour: [currentSettings ? currentSettings.charityAddressLineFour : null],
      charityAddressZipCode: [currentSettings ? currentSettings.charityAddressZipCode : null, [Validators.required,postCodeBACSValidator(),notNullOrEmptyValidator()]],
      charityAddressCountry: [{
       value: currentSettings ? currentSettings.charityAddressCountry : null,
       disabled: true
      }, [Validators.required,notNullOrEmptyValidator()]]
    },{updateOn:'submit'});
  }

  private currentSettings(): PreparedGiftAidSettings {
    // if we already did this step and the user returns to this screen, then load the previously entered settings
    // and do not reload them from our prepare endpoint as the user might altered them
    if (!this.giftAidStateService.validatedAndCompletedStepThree) {
      return this.activatedRoute.parent.snapshot.data.giftAidSettings;
    } else {
      return this.giftAidStateService.currentGiftAidSettings as PreparedGiftAidSettings;
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

    if (addressLine1Errors)
      if (addressLine1Errors.trimEmptyValue || addressLine1Errors.required)
        errorMessages.push(this.translationService.get('errorMessages.address-required'));

    if (addressLine2Errors)
      if (addressLine2Errors.trimEmptyValue || addressLine2Errors.required)
        errorMessages.push(this.translationService.get('errorMessages.address-required'));

        if (addressZipCodeErrors) {
          if (addressZipCodeErrors.trimEmptyValue || addressZipCodeErrors.required){
            errorMessages.push(this.translationService.get('errorMessages.zipcode-required'));
          }
          if(addressZipCodeErrors.invalidPostCode) {
            errorMessages.push(this.translationService.get('errorMessages.postcode-invalid'));
    
          }
        }

    if (addressCountryErrors)
      if (addressCountryErrors.trimEmptyValue || addressCountryErrors.required)
        errorMessages.push(this.translationService.get('errorMessages.country-required'));

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
    this.router.navigate(['/', 'onboarding','giftaid', {outlets: {'onboarding-outlet': ['verify-organisation-details']}}]);
  }
}
