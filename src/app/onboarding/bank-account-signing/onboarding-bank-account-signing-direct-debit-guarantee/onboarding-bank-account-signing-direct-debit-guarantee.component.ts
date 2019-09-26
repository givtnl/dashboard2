import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-bank-account-signing-direct-debit-guarantee',
  templateUrl: './onboarding-bank-account-signing-direct-debit-guarantee.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-direct-debit-guarantee.component.scss']
})
export class OnboardingBankAccountSigningDirectDebitGuaranteeComponent implements OnInit {
  
  public form: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      acceptedDirectDebitGuarantee: [null, [Validators.required]]
    })
  }
}
