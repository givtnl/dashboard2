import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-onboarding-bank-account-authorized',
  templateUrl: './onboarding-bank-account-authorized.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-authorized.component.scss']
})
export class OnboardingBankAccountAuthorizedComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      mobile: [null, [Validators.required]]
    })
  }

  get mobile() {
    return this.form.get('mobile')
  }

  submit() {
    console.log("yeet")
  }
}
