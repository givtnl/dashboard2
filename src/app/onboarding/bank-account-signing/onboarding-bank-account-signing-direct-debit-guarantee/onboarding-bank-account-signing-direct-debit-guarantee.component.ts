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
  public disableSignButton = true;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      acceptedDirectDebitGuarantee: [null, [Validators.required]]
    })
    this.form.valueChanges.subscribe(x => x.acceptedDirectDebitGuarantee ? this.disableSignButton = false : this.disableSignButton = true)
  }
  submit() {
    if (!this.form.invalid) {
      console.log("je moe nog beslisn")
      this.router.navigate(['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['complete'] } }], {
        queryParamsHandling: 'merge'
      });
    }
  }
}
