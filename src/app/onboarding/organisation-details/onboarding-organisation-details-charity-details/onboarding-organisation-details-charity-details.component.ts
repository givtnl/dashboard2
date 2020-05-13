import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';

@Component({
  selector: 'app-onboarding-organisation-details-charity-details',
  templateUrl: './onboarding-organisation-details-charity-details.component.html',
  styleUrls: ['./onboarding-organisation-details-charity-details.component.scss']
})
export class OnboardingOrganisationDetailsCharityDetailsComponent implements OnInit {
  public form: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private onboardingStateService: OnboardingOrganisationDetailsStateService,
    private router: Router
    ) { }

  ngOnInit() {
    var regulator = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Regulator;
    var referenceWithRegulator = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ReferenceWithRegulator;
    var referenceWithParent = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ReferenceWithParent;
    var referenceWithHMRC = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ReferenceWithHMRC;

    this.form = this.formBuilder.group({
      regulator: [regulator ? regulator : null, [Validators.required]],
      referenceWithRegulator: [referenceWithRegulator ? referenceWithRegulator : null, [Validators.required]],
      referenceWithParent: [referenceWithParent ? referenceWithParent : null, [Validators.required]],
      referenceWithHMRC: [referenceWithHMRC ? referenceWithHMRC : null, [Validators.required]]
    })
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
  }
  handleInvalidForm() {

  }
  continue() {
    var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
    currentOrganisationRegistrationDetailModel.Regulator = this.form.value.Regulator;
    currentOrganisationRegistrationDetailModel.ReferenceWithRegulator = this.form.value.ReferenceWithRegulator;
    currentOrganisationRegistrationDetailModel.ReferenceWithParent = this.form.value.ReferenceWithParent;
    currentOrganisationRegistrationDetailModel.ReferenceWithHMRC = this.form.value.ReferenceWithHMRC;
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/','onboarding','organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }])
  }
}
