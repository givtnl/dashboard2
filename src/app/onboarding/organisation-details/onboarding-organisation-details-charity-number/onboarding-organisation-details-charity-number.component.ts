import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OnboardingOrganisationDetailsStateService } from '../services/onboarding-organisation-details-state.service';

@Component({
  selector: 'app-onboarding-organisation-details-charity-number',
  templateUrl: './onboarding-organisation-details-charity-number.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-charity-number.component.scss']
})
export class OnboardingOrganisationDetailsCharityNumberComponent implements OnInit {
  public form: FormGroup
  public loading = false
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translationService: TranslateService,
    private router: Router,
    private stateService: OnboardingOrganisationDetailsStateService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      charityNumber: [null, [Validators.required]]
    });
  }
  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.stateService.currentCharityNumber = this.form.value.charityNumber;

    this.loading = true;
    this.router
      .navigate(['/', 'onboarding', 'organisation-details', { outlets: { 'onboarding-outlet': ['check-details'] } }])
      .finally(() => (this.loading = false));
  }
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const charityNumberErrors = this.form.get('charityNumber').errors;

    if (charityNumberErrors) {
      if (charityNumberErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.charity-number-required'));
      }
    }

    forkJoin(errorMessages)
      .pipe(tap(results => (resolvedErrorMessages = results)))
      .pipe(tap(results => console.log(results)))
      .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );
  }
}
