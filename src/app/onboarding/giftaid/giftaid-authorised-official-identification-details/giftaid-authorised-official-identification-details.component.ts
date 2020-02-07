import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';

@Component({
  selector: 'app-giftaid-authorised-official-identification-details',
  templateUrl: './giftaid-authorised-official-identification-details.component.html',
  styleUrls: ['./giftaid-authorised-official-identification-details.component.scss']
})
export class GiftaidAuthorisedOfficialIdentificationDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private giftAidStateService: OnboardingGiftAidStateService) {}

  ngOnInit() {
    const currentSettings = this.getCachedValue();
    this.form = this.fb.group({
      nationalInsuranceNumber: [currentSettings ? currentSettings.nationalInsuranceNumber : null, [Validators.required, Validators.maxLength(10)]],
      nationalIdentityCardNumber: [currentSettings ? currentSettings.nationalIdentityCardNumber : null, [Validators.required, Validators.maxLength(50)]]
    });
  }

  private getCachedValue(): CreateGiftAidSettingsCommand {
    if (this.giftAidStateService.validatedAndCompletedStepThree) {
      return this.giftAidStateService.currentGiftAidSettings;
    }
    return null;
  }

  public submit():void{
    // if validated
    this.continue();
  }

  // only call this function when all of the input has been validated
  private continue(): void {
    const currentSettings = this.giftAidStateService.currentGiftAidSettings;
    currentSettings.nationalInsuranceNumber = this.form.value.nationalInsuranceNumber;
    currentSettings.nationalIdentityCardNumber = this.form.value.nationalIdentityCardNumber;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedStepThree = true;
    // todo implement the route
    this.router.navigate(['/', 'onboarding','giftaid', {outlets: {'onboarding-outlet': ['authorised-official-address-details']}}]);
  }
}
