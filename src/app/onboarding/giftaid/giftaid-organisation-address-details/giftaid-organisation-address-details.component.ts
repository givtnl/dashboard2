import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';

@Component({
  selector: 'app-giftaid-organisation-address-details',
  templateUrl: './giftaid-organisation-address-details.component.html',
  styleUrls: ['./giftaid-organisation-address-details.component.scss']
})
export class GiftaidOrganisationAddressDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService
  ) {}

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.fb.group({
      charityAddressLineOne: [this.currentSettings ? currentSettings.charityAddressLineOne : null, [Validators.required, Validators.maxLength(150)]],
      charityAddressLineTwo: [this.currentSettings ? currentSettings.charityAddressLineTwo : null, [Validators.required, Validators.maxLength(150)]],
      charityAddressLineThree: [this.currentSettings ? currentSettings.charityAddressLineThree : null, [Validators.maxLength(150)]],
      charityAddressLineFour: [null, [Validators.maxLength(150)]],
      charityAddressZipCode: [this.currentSettings ? currentSettings.charityAddressZipCode : null, [Validators.required, Validators.maxLength(15)]],
      charityAddressCountry: [this.currentSettings ? currentSettings.charityAddressCountry : null, [Validators.required, Validators.maxLength(50)]]
    });
  }

  private currentSettings(): PreparedGiftAidSettings {
    // if we already did this step and the user returns to this screen, then load the previously entered settings
    // and do not reload them from our prepare endpoint as the user might altered them
    if (!this.giftAidStateService.validatedAndCompletedOrganisationDetails) {
      return this.activatedRoute.parent.snapshot.data.giftAidSettings;
    } else {
      return this.giftAidStateService.currentGiftAidSettings;
    }
  }

  
  public submit():void{
    // if validated
    this.continue();
  }

  // only call this function when all of the input has been validated
  private continue(): void {
    const currentSettings = this.giftAidStateService.currentGiftAidSettings;
    currentSettings.charityAddressLineOne = this.form.value.charityAddressLineOne;
    currentSettings.charityAddressLineTwo = this.form.value.charityAddressLineTwo;
    currentSettings.charityAddressLineThree = this.form.value.charityAddressLineThree;
    currentSettings.charityAddressLineFour = this.form.value.charityAddressLineFour;
    currentSettings.charityAddressZipCode = this.form.value.charityAddressZipCode;
    currentSettings.charityAddressCountry = this.form.value.charityAddressCountry;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedOrganisationDetails = true;
    // todo implement the route
    this.router.navigate[''];
  }
}
