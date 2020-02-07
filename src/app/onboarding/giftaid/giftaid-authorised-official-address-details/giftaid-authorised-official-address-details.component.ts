import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';

@Component({
  selector: 'app-giftaid-authorised-official-address-details',
  templateUrl: './giftaid-authorised-official-address-details.component.html',
  styleUrls: ['./giftaid-authorised-official-address-details.component.scss']
})
export class GiftaidAuthorisedOfficialAddressDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private giftAidStateService: OnboardingGiftAidStateService) {}

  ngOnInit() {
    const currentSettings = this.getCachedValue();
    this.form = this.fb.group({
      authorisedOfficialHomeAddressLineOne: [
        currentSettings ? currentSettings.authorisedOfficialHomeAddressLineOne : null,
        [Validators.required, Validators.maxLength(50)]
      ],
      authorisedOfficialHomeAddressLineTwo: [
        currentSettings ? currentSettings.authorisedOfficialHomeAddressLineTwo : null,
        [Validators.required, Validators.maxLength(150)]
      ],
      authorisedOfficialHomeAddressLineThree: [
        currentSettings ? currentSettings.authorisedOfficialHomeAddressLineThree : null,
        [Validators.required, Validators.maxLength(150)]
      ],
      authorisedOfficialHomeAddressLineZipCode: [currentSettings ? currentSettings.authorisedOfficialHomeAddressLineZipCode : null, [Validators.maxLength(15)]],
      authorisedOfficialHomeAddressLineCountry: [currentSettings ? currentSettings.authorisedOfficialHomeAddressLineCountry : null, [Validators.maxLength(50)]]
    });
  }

  private getCachedValue(): CreateGiftAidSettingsCommand {
    if (this.giftAidStateService.validatedAndCompletedAuthorisedOfficialDetails) {
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
    
    currentSettings.authorisedOfficialHomeAddressLineOne = this.form.value.authorisedOfficialHomeAddressLineOne;
    currentSettings.authorisedOfficialHomeAddressLineTwo = this.form.value.authorisedOfficialHomeAddressLineTwo;
    currentSettings.authorisedOfficialHomeAddressLineThree = this.form.value.authorisedOfficialHomeAddressLineThree;
    currentSettings.authorisedOfficialHomeAddressLineZipCode = this.form.value.authorisedOfficialHomeAddressLineZipCode;
    currentSettings.authorisedOfficialHomeAddressLineCountry = this.form.value.authorisedOfficialHomeAddressLineCountry;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedAuthorisedOfficialDetails = true;
    // todo implement the route
    this.router.navigate(['/', 'onboarding','giftaid', {outlets: {'onboarding-outlet': ['verify-organisation-details']}}]);
  }
}
