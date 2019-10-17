import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboarding-organisation-details-charity-number',
  templateUrl: './onboarding-organisation-details-charity-number.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-charity-number.component.scss']
})
export class OnboardingOrganisationDetailsCharityNumberComponent implements OnInit {
  public form: FormGroup
  public loading: false
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      charityNumber: [null, [Validators.required]]
    });
  }
  submit() {

  }
}
