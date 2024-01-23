import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BankAccountHolderService } from 'src/app/bank-account-holders/services/bank-account-holder.service';

@Component({
  selector: 'app-onboarding-bank-account-signing-verify-personal-details',
  templateUrl: './onboarding-bank-account-signing-verify-personal-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-verify-personal-details.component.scss']
})
export class OnboardingBankAccountSigningVerifyPersonalDetailsComponent implements OnInit, OnDestroy {
  public form: UntypedFormGroup;
  public loading = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private bankAccountHolderService: BankAccountHolderService,
    private translationService: TranslateService,
    public stateService: OnboardingBankAccountSigningStateService,
    private router: Router,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit() {
        this.form = this.fb.group({
      id: this.stateService.currentBankAccountHolderDetailModel.Id,
      accountId: this.stateService.currentBankAccountHolderDetailModel.AccountId,
      firstName: [
        this.stateService.currentBankAccountHolderDetailModel.FirstName,
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      ],
      lastName: [this.stateService.currentBankAccountHolderDetailModel.LastName, [Validators.required, Validators.maxLength(50)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.loading = true;

    this.bankAccountHolderService
      .update(this.route.snapshot.queryParams.organisationId, this.form.getRawValue())
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(x => this.updateValuesInStateService()))
      .subscribe(x => this.continue());
  }

  continue(): void {
    this.router
      .navigate(['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['verify-details'] } }], {
        queryParamsHandling: 'merge'
      })
      .finally(() => (this.loading = false));
  }

  updateValuesInStateService(): void {
    const currentModel = this.stateService.currentBankAccountHolderDetailModel;
    currentModel.FirstName = this.form.value.firstName;
    currentModel.LastName = this.form.value.lastName;
    this.stateService.currentBankAccountHolderDetailModel = currentModel;
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const firstNameErrors = this.form.get('firstName').errors;
    const lastNameErrors = this.form.get('lastName').errors;

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
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(results => (resolvedErrorMessages = results)),
        switchMap(_ => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
