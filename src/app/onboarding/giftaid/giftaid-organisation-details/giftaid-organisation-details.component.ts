import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';

@Component({
  selector: 'app-giftaid-organisation-details',
  templateUrl: './giftaid-organisation-details.component.html',
  styleUrls: ['./giftaid-organisation-details.component.scss']
})
export class GiftaidOrganisationDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService
  ) {}

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.fb.group({
      charityCommissionReference: [this.currentSettings ? currentSettings.charityCommissionReference : null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      charityId: [this.currentSettings ? currentSettings.charityId : null, [Validators.required, Validators.maxLength(20)]],
      charityName: [this.currentSettings ? currentSettings.charityName : null, [Validators.required, Validators.maxLength(100)]],
      charityEmailAddress: [this.currentSettings ? currentSettings.charityEmailAddress : null, [Validators.required, Validators.maxLength(250), Validators.email]],
      charityPhoneNumber: [this.currentSettings ? currentSettings.charityPhoneNumber : null, [Validators.required, Validators.maxLength(50)]],
      charityAddressLineOne: [this.currentSettings ? currentSettings.charityAddressLineOne : null, [Validators.required, Validators.maxLength(150)]],
      charityAddressLineTwo: [this.currentSettings ? currentSettings.charityAddressLineTwo : null, [Validators.required, Validators.maxLength(150)]],
      charityAddressLineThree: [this.currentSettings ? currentSettings.charityAddressLineThree : null, [Validators.maxLength(150)]],
      charityAddressLineFour: [null, [Validators.maxLength(150)]],
      charityAddressLineZipCode: [this.currentSettings ? currentSettings.charityAddressZipCode : null, [Validators.required, Validators.maxLength(15)]],
      charityAddressLineCountry: [this.currentSettings ? currentSettings.charityAddressCountry : null, [Validators.required, Validators.maxLength(50)]]
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
}
