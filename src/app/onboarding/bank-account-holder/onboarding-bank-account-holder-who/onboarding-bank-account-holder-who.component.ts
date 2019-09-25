import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-bank-account-holder-who',
  templateUrl: './onboarding-bank-account-holder-who.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-holder-who.component.scss']
})

export class OnboardingBankAccountHolderWhoComponent implements OnInit {

  public form: FormGroup

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      email: [null, [Validators.required, Validators.email]] 
    })
  }

  ngOnInit() {
  }
  submit() {
    this.router.navigate(['/', 'onboarding', 'bank-account-holder', { outlets: { 'onboarding-outlet': ['completed'] } }], {
      queryParamsHandling: 'merge'
    });
  }
}
