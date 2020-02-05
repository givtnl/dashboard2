import { Component, OnInit } from '@angular/core';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';

@Component({
  selector: 'app-giftaid-authorised-official-details',
  templateUrl: './giftaid-authorised-official-details.component.html',
  styleUrls: ['./giftaid-authorised-official-details.component.scss']
})
export class GiftaidAuthorisedOfficialDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private giftAidStateService: OnboardingGiftAidStateService) {}

  ngOnInit() {
    const currentSettings = this.getCachedValue();
    this.form = this.fb.group({
      authorisedOfficialFirstName: [
        currentSettings ? currentSettings.authorisedOfficialFirstName : null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(150)]
      ],
      authorisedOfficialMiddleName: [currentSettings ? currentSettings.authorisedOfficialMiddleName : null, [Validators.maxLength(50)]],
      authorisedOfficialLastName: [currentSettings ? currentSettings.authorisedOfficialLastName : null, [Validators.required, Validators.maxLength(150)]],
      authorisedOfficialPhoneNumber: [currentSettings ? currentSettings.authorisedOfficialPhoneNumber : null, [Validators.required, Validators.maxLength(50)]]
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
    currentSettings.authorisedOfficialFirstName = this.form.value.authorisedOfficialFirstName;
    currentSettings.authorisedOfficialMiddleName = this.form.value.authorisedOfficialMiddleName;
    currentSettings.authorisedOfficialLastName = this.form.value.authorisedOfficialLastName;
    currentSettings.authorisedOfficialPhoneNumber = this.form.value.authorisedOfficialPhoneNumber;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedAuthorisedOfficialDetails = true;
    // todo implement the route
    this.router.navigate[''];
  }
}
