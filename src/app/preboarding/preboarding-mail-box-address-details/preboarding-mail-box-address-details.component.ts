import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { organisationSettings } from '../models/preboarding-details-settings.model';

@Component({
  selector: 'app-preboarding-mail-box-address-details',
  templateUrl: './preboarding-mail-box-address-details.component.html',
  styleUrls: ['./preboarding-mail-box-address-details.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingMailBoxAddressDetailsComponent implements OnInit {
  form: FormGroup
  constructor(
    private formBuilder: FormBuilder, 
    private translationService: TranslateService, 
    private toastr: ToastrService,
    private preboardingStateService: PreboardingStateService,
    private router: Router) { }

  ngOnInit() {
    const currentSettings = this.getCachedValue();

    this.form = this.formBuilder.group({
      mailBoxAddress: [null, [Validators.required]],
      mailBoxCity: [null, [Validators.required]], 
      mailBoxZipCode: [null, [Validators.required]],
      mailBoxComments: [null, []]
    });
  }

  private getCachedValue(): organisationSettings {
    if (this.preboardingStateService.validatedAndCompletedStepTwo) {
      return this.preboardingStateService.currentOrganisationDetails;
    }
    return null;
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.continue();
    this.router.navigate(["/preboarding/register/collection-medium-details"])
  }

  continue() {
    const currentSettings = this.preboardingStateService.currentOrganisationDetails;

    currentSettings.address.addressLine = this.form.value.authorisedOfficialHomeAddressLineOne;
    currentSettings.address.city  = this.form.value.authorisedOfficialHomeAddressLineTwo;
    currentSettings.address.postalCode = this.form.value.authorisedOfficialHomeAddressLineThree;
    currentSettings.address.country = this.form.value.authorisedOfficialHomeAddressLineFour;
    currentSettings.address.description = this.form.value.authorisedOfficialHomeAddressZipCode;
    
    this.preboardingStateService.currentOrganisationDetails = currentSettings;
    this.preboardingStateService.validatedAndCompletedStepThree = true;
  }
  
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const mailBoxAddressErrors = this.form.get('mailBoxAddress').errors;
    const mailBoxCityErrors = this.form.get('mailBoxCity').errors;
    const mailBoxZipcodeErrors = this.form.get('mailBoxZipCode').errors;

    if (mailBoxAddressErrors) {
      if (mailBoxAddressErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-required'));
      }
    }
    if (mailBoxCityErrors) {
      if (mailBoxCityErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-city-required'));
      }
    }
    if (mailBoxZipcodeErrors) {
      if (mailBoxZipcodeErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.address-zipcode-required'));
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

}
