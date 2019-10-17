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
  public organisationDetails: CharityCommissionDetailModel
  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private router: Router
  ) { }



  ngOnInit() {
    this.organisationDetails = {
      charityNumber: 123123123,
      charityName: "Givt Charity",
      address: {
        locality: "Givt Baptist Church",
        street: "123 MILEMEEMESTRT",
        locality2: "GIVT",
        postCode: "8501"
      },
      phoneNumber: "123123123123",
      email: "info@givtapp.net",
      trustee: {
        trusteeName: "JOnas",
        trusteeNumber: 1337
      }
    }
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


export interface CharityCommissionDetailModel {
  charityNumber: number
  charityName: string
  address: CharityCommissionAddress
  phoneNumber: string
  email: string
  trustee: CharityCommissionTrustee
  isSuspended?: boolean
}

export interface CharityCommissionAddress {
  locality: string
  street: string
  locality2: string
  postCode: string
}

export interface CharityCommissionTrustee {
  trusteeNumber: number
  trusteeName: string
}