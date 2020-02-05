import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService
  ) {}

  ngOnInit() {
    const currentSettings = this.currentSettings();
    this.form = this.fb.group({
      charityName: [this.currentSettings ? currentSettings.charityName : null, [Validators.required, Validators.maxLength(100)]],
      charityEmailAddress: [this.currentSettings ? currentSettings.charityEmailAddress : null, [Validators.required, Validators.maxLength(250), Validators.email]],
      charityPhoneNumber: [this.currentSettings ? currentSettings.charityPhoneNumber : null, [Validators.required, Validators.maxLength(50)]]
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
    currentSettings.charityName = this.form.value.charityName;
    currentSettings.charityEmailAddress = this.form.value.charityEmailAddress;
    currentSettings.charityPhoneNumber = this.form.value.charityPhoneNumber;

    this.giftAidStateService.currentGiftAidSettings = currentSettings;
    this.giftAidStateService.validatedAndCompletedOrganisationDetails = true;
    // todo implement the route
    this.router.navigate[''];
  }
}
