import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';
import { Router } from '@angular/router';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-onboarding-organisation-details-charity-details',
  templateUrl: './onboarding-organisation-details-charity-details.component.html',
  styleUrls: ['./onboarding-organisation-details-charity-details.component.scss']
})
export class OnboardingOrganisationDetailsCharityDetailsComponent implements OnInit {
  public form: FormGroup
  public hasParent: boolean = undefined
  constructor(
    private formBuilder: FormBuilder,
    private onboardingStateService: OnboardingOrganisationDetailsStateService,
    private router: Router,
    private translationService: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.hasParent = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ParentId != null

    var regulator = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.Regulator;
    var referenceWithRegulator = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ReferenceWithRegulator;
    var referenceWithParent = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ReferenceWithParent;
    var referenceWithHMRC = this.onboardingStateService.currentOrganisationRegistrationDetailsModel.ReferenceWithHMRC;

    if (this.hasParent) {
      this.form = this.formBuilder.group({
        referenceWithParent: [referenceWithParent ? referenceWithParent : null, [Validators.required, Validators.maxLength(100)]],
      });
    } else {
      this.form = this.formBuilder.group({
        regulator: [regulator ? regulator : null, [Validators.required]],
        referenceWithRegulator: [{ value: referenceWithRegulator ? referenceWithRegulator : null, disabled: true }, [Validators.required, Validators.maxLength(30)]],
        referenceWithHMRC: [{ value: referenceWithHMRC ? referenceWithHMRC : null, disabled: true }, [Validators.required, Validators.maxLength(30)]]
      });

      this.form.get('regulator').valueChanges.subscribe(x => this.onChangeRegulator(x));
      // make sure the controls are loaded upon navigation forward backwards
      // else it could be the field is disabled, but the user could fill it in ?
      // so re-evaulate the controls
      this.onChangeRegulator(this.form.value.regulator);
    }

  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
  }
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    if (this.hasParent) {
      const referenceWithParentErrors = this.form.get('referenceWithParent').errors;
      if (referenceWithParentErrors) {
        if (referenceWithParentErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.parent-reference-required'));
        }
      }
    } else {
      const regulatorErrors = this.form.get('regulator').errors;
      const referenceWithRegulatorErrors = this.form.get('referenceWithRegulator').errors;
      const referenceWithHMRCErrors = this.form.get('referenceWithHMRC').errors;
      if (regulatorErrors) {
        if (regulatorErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.regulator-required'));
        }
      }
      if (referenceWithRegulatorErrors) {
        if (referenceWithRegulatorErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.regulator-reference-required'));
        }
      }

      if (referenceWithHMRCErrors) {
        if (referenceWithHMRCErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.hmrc-reference-required'));
        }
      }
    }

    forkJoin(errorMessages)
      .pipe(tap(results => (resolvedErrorMessages = results)))
      .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );

  }
  continue() {
    var currentOrganisationRegistrationDetailModel: UpdateOrganisationCommand = this.onboardingStateService.currentOrganisationRegistrationDetailsModel
    currentOrganisationRegistrationDetailModel.Regulator = this.form.value.regulator;
    currentOrganisationRegistrationDetailModel.ReferenceWithRegulator = this.form.value.referenceWithRegulator;
    currentOrganisationRegistrationDetailModel.ReferenceWithParent = this.form.value.referenceWithParent;
    currentOrganisationRegistrationDetailModel.ReferenceWithHMRC = this.form.value.referenceWithHMRC;
    this.onboardingStateService.currentOrganisationRegistrationDetailsModel = currentOrganisationRegistrationDetailModel
    this.router.navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['complete'] } }])
  }
  onChangeRegulator(selectedValue: number) {
    let enableCharityId = false;
    let enableRegulatorReference = false;
    switch (selectedValue) {
      case null:
        enableCharityId = false;
        enableRegulatorReference = false;
        break;
      case 4:
        enableCharityId = true;
        enableRegulatorReference = false;
        break;
      case 5:
      case 6:
      case 7:
        enableCharityId = false;
        enableRegulatorReference = true;
        break;
      default:
        enableCharityId = true;
        enableRegulatorReference = true;
        break;
    }
    enableCharityId === true ? this.form.get('referenceWithHMRC').enable() : this.form.get('referenceWithHMRC').disable()
    enableRegulatorReference === true ? this.form.get('referenceWithRegulator').enable() : this.form.get('referenceWithRegulator').disable()

    // reset the field values because they might have been disabled or are disabled now
    // this way, we cannot have unexpected input ( for example HMRC ID when the field was disabled )
    this.form.get('referenceWithRegulator').reset();
    this.form.get('referenceWithHMRC').reset();
  }
}
