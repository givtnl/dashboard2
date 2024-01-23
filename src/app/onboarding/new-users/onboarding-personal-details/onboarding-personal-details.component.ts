import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap, takeUntil, finalize } from 'rxjs/operators';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';


@Component({
  selector: 'app-onboarding-personal-details',
  templateUrl: './onboarding-personal-details.component.html',
  styleUrls: ['../../onboarding.scss', './onboarding-personal-details.component.scss']
})
export class OnboardingPersonalDetailsComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public loading = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private translationService: TranslateService,
    private formBuilder: UntypedFormBuilder,
    public stateService: OnboardingNewUsersStateService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [
        this.stateService.currentRegisterModel ? this.stateService.currentRegisterModel.firstName : null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(150)]
      ],
      lastName: [
        this.stateService.currentRegisterModel ? this.stateService.currentRegisterModel.lastName : null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(150)]
      ]
    });
  }

  submit() {
    this.loading = true;
    if (this.form.invalid) {
      this.handleInvalidForm();
      this.loading = false;
      return;
    }
    const currentRegisterModel = this.stateService.currentRegisterModel;
    currentRegisterModel.firstName = this.form.value.firstName;
    currentRegisterModel.lastName = this.form.value.lastName;
    currentRegisterModel.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    currentRegisterModel.collectGroupId = this.stateService.currentOnboardingRequest.collectGroupId;
    this.stateService.currentRegisterModel = currentRegisterModel;

    this.router.navigate(['/', 'onboarding', 'welcome', 'new-users', {outlets: {'onboarding-outlet': ['completed']}}], {
      queryParamsHandling: 'merge'
    }).finally( () => {
      this.loading = false;
    })
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const firstNameErrors = this.form.get('firstName').errors;
    const lastNameErrors = this.form.get('lastName').errors;

    if (firstNameErrors) {
      if (firstNameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.first-name-required'));
      }
      if (firstNameErrors.minlength) {
        errorMessages.push(this.translationService.get('errorMessages.first-name-min-length'));
      }
      if (firstNameErrors.maxlength) {
        errorMessages.push(this.translationService.get('errorMessages.first-name-max-length'));
      }
    }

    if (lastNameErrors) {
      if (lastNameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-required'));
      }
      if (lastNameErrors.minlength) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-min-length'));
      }
      if (lastNameErrors.maxlength) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-max-length'));
      }
    }
    this.loading = true;
    forkJoin(errorMessages)
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(results => (resolvedErrorMessages = results)),
        switchMap(_ => this.translationService.get('errorMessages.validation-errors')),
        finalize(() => this.loading = false))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      )
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
