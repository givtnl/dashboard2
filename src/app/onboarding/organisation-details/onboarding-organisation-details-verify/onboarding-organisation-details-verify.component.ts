import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-organisation-details-verify',
  templateUrl: './onboarding-organisation-details-verify.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-verify.component.scss']
})
export class OnboardingOrganisationDetailsVerifyComponent implements OnInit {
  public form: FormGroup
  public loading = false
  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });
    this.form.valueChanges.subscribe(x => {
      if (x.detailsCorrect) {
        this.router.navigate(
          ['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }],
          {
            queryParamsHandling: 'merge'
          }
        );
      } else {
        this.loading = true
        this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['incorrect'] } }], {
          queryParamsHandling: 'merge'
        }).finally(() => this.loading = false)
      }
    });
  }

}
