import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';

@Component({
  selector: 'app-onboarding-organisation-details-verify',
  templateUrl: './onboarding-organisation-details-verify.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-verify.component.scss']
})
export class OnboardingOrganisationDetailsVerifyComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public organisationDetails: CharityCommisionOrganisationDetailModel;
  public addressLines = new Array<string>();

  constructor(private formBuilder: FormBuilder, private router: Router, public stateService: OnboardingOrganisationDetailsStateService) {}

  ngOnInit() {
    this.organisationDetails = this.stateService.currentOrganisationCharityCommisionModel;
    this.addressLines = [
      this.organisationDetails.AddressLineOne,
      this.organisationDetails.AddressLineTwo,
      this.organisationDetails.AddressLineThree,
      this.organisationDetails.AddressLineFour
    ];
    this.form = this.formBuilder.group({
      name: [
        {
          value: this.organisationDetails.Name,
          disabled: true
        }
      ],
      address: [null, [Validators.required]],
      postalCode: [
        {
          value: this.organisationDetails.PostCode,
          disabled: true
        }
      ],
      city: [null, [Validators.required]],
      locality: [null],
      charityCommissionNumber: [this.stateService.currentCharityNumber, [Validators.required]],
      detailsCorrect: [null]
    });
    
    this.form.get('detailsCorrect').valueChanges.subscribe(detailsAreCorrect => {
      this.loading = true;
      this.stateService.currentEditedOrganisationCharityCommisionCommand = this.form.getRawValue();
      this.router
        .navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': [detailsAreCorrect ? 'complete' : 'incorrect'] } }], {
          queryParamsHandling: 'merge'
        })
        .finally(() => (this.loading = false));
    });
  }

  setRouterPath(path: string) {
    this.router
      .navigate(
        [
          '/',
          'onboarding',
          'organisation-details',
          { outlets: { 'onboarding-outlet': [path] } }
        ],
        {
          queryParamsHandling: 'merge'
        }
      )
      .finally(() => (this.loading = false));
  }

  public checkboxStatusChangend(value: boolean) {

  }
}
