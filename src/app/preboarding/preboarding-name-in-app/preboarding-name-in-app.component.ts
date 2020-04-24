import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { organisationSettings } from '../models/preboarding-details-settings.model';

@Component({
  selector: 'app-preboarding-name-in-app',
  templateUrl: './preboarding-name-in-app.component.html',
  styleUrls: ['./preboarding-name-in-app.component.scss', '../../preboarding/preboarding.module.scss']
})
export class PreboardingNameInAppComponent implements OnInit {

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
      inAppOrgName: [currentSettings ? currentSettings.organisationName : null, [Validators.required, Validators.maxLength(40)]]
    });
  }

  private getCachedValue(): organisationSettings {
    if (this.preboardingStateService.validatedAndCompletedStepOne) {
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
    this.router.navigate(["/preboarding/register/mail-box-address-details"])
  }

  continue() {
    const currentSettings = this.preboardingStateService.currentOrganisationDetails;

    currentSettings.organisationName = this.form.value.inAppOrgName;
    
    this.preboardingStateService.currentOrganisationDetails = currentSettings;
    this.preboardingStateService.validatedAndCompletedStepOne = true;
  }
  
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityNumberErrors = this.form.get('inAppOrgName').errors;

    if (charityNumberErrors) {
      if (charityNumberErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.name-in-app-required'));
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
