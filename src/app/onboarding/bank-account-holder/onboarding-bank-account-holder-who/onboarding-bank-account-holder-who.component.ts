import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { OnboardingBankAccountHolderStateService } from '../services/onboarding-bank-account-holder-state.service';

@Component({
  selector: 'app-onboarding-bank-account-holder-who',
  templateUrl: './onboarding-bank-account-holder-who.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-holder-who.component.scss']
})
export class OnboardingBankAccountHolderWhoComponent implements OnInit {
  public form: FormGroup;
  public loading = false;

  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private onboardingBankAccountHolderStateService: OnboardingBankAccountHolderStateService,
    private translationService: TranslateService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {

    this.onboardingBankAccountHolderStateService.currentBankAccountListModel = this.route.parent.snapshot.data.bankAccount;

    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: [null, [Validators.required, Validators.maxLength(50)]],
      emailAddress: [null, [Validators.required, Validators.email, Validators.maxLength(70)]],
      sendInvitationEmail:[true] // need this placeholder, this is a perfect place to decide to send an email
      // since this takes place in onboarding, on re-usage we can decide to opt-out this boooolieen
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.loading = true;
    this.onboardingBankAccountHolderStateService.currentInvitationModel = this.form.getRawValue();
    this.router
      .navigate(['/', 'onboarding', 'bank-account-holder', { outlets: { 'onboarding-outlet': ['completed'] } }])
      .finally(() => (this.loading = false));
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const firstNameErrors = this.form.get('firstName').errors;
    const lastNameErrors = this.form.get('lastName').errors;
    const emailErrors = this.form.get('emailAddress').errors;

    if (lastNameErrors) {
      if (lastNameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-required'));
      }
      if (lastNameErrors.minLength) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-min-length'));
      }

      if (lastNameErrors.maxLength) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-max-length'));
      }
    }

    if (emailErrors) {
      if (emailErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.email-required'));
      }
    }

    if (firstNameErrors) {
      if (firstNameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.first-name-required'));
      }
      if (lastNameErrors.minLength) {
        errorMessages.push(this.translationService.get('errorMessages.first-name-min-length'));
      }
      if (lastNameErrors.maxLength) {
        errorMessages.push(this.translationService.get('errorMessages.first-name-max-length'));
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
