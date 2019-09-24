import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboarding-bank-account-holder-who',
  templateUrl: './onboarding-bank-account-holder-who.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-holder-who.component.scss']
})

export class OnboardingBankAccountHolderWhoComponent implements OnInit {

  public form: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]]
    })
  }

  ngOnInit() {
  }

}
