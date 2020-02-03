import { Component, OnInit } from '@angular/core';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';

@Component({
  selector: 'app-giftaid-authorised-official-details',
  templateUrl: './giftaid-authorised-official-details.component.html',
  styleUrls: ['./giftaid-authorised-official-details.component.scss']
})
export class GiftaidAuthorisedOfficialDetailsComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private giftAidStateService: OnboardingGiftAidStateService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      authorisedOfficialFirstName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      authorisedOfficialMiddleName: [null, [Validators.required, Validators.maxLength(50)]],
      authorisedOfficialLastName: [null, [Validators.required, Validators.maxLength(150)]],
      authorisedOfficialPhoneNumber: [null, [Validators.required, Validators.maxLength(50)]],
      authorisedOfficialHomeAddressLineOne: [null, [Validators.required, Validators.maxLength(50)]],
      authorisedOfficialHomeAddressLineTwo: [null, [Validators.required, Validators.maxLength(150)]],
      authorisedOfficialHomeAddressLineThree: [null, [Validators.required, Validators.maxLength(150)]],
      authorisedOfficialHomeAddressZipCode: [null, [Validators.maxLength(15)]],
      authorisedOfficialHomeAddressCountry: [null, [Validators.maxLength(50)]],
      nationalInsuranceNumber: [null, [Validators.required, Validators.maxLength(10)]],
      nationalIdentityCardNumber: [null, [Validators.required, Validators.maxLength(50)]]
    });
  }
}
