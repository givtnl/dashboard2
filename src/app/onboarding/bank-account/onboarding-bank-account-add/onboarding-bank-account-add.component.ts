import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { fixedLengthValidator } from '../../../shared/validators/fixed-length.validator';
import { OnboardingBankAccountStateService } from '../services/onboarding-bank-account-state.service';
import { OnboardingBankAccountRegistrationResponseModel } from '../models/onboarding-bank-account-registration-response.model';

@Component({
  selector: 'app-onboarding-bank-account-add',
  templateUrl: './onboarding-bank-account-add.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-add.component.scss']
})
export class OnboardingBankAccountAddComponent implements OnInit {
  public orgCountry: string = 'GB';
  public loading = false;
  public form: FormGroup;

  constructor(
    private translationService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: OnboardingBankAccountStateService
  ) {}

  ngOnInit() {
    const currentBankDetails = this.route.parent.snapshot.data.bankaccount as OnboardingBankAccountRegistrationResponseModel;

    this.form = this.formBuilder.group({
      sortCode: [currentBankDetails == null ? null : currentBankDetails.SortCode, [Validators.required, fixedLengthValidator(6)]],
      accountNumber: [currentBankDetails == null ? null : currentBankDetails.AccountNumber, [Validators.required, fixedLengthValidator(8)]],
      accountName: [currentBankDetails == null ? null : currentBankDetails.AccountName, [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.stateService.currentBankAccountModel = this.form.value;
    this.loading = true;
    this.router
      .navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['completed'] } }])
      .finally(() => (this.loading = false));
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const accountNameErrors = this.form.get('accountName').errors;
    const sortCodeErrors = this.form.get('sortCode').errors;
    const accountNumberErrors = this.form.get('accountNumber').errors;

    if (sortCodeErrors) {
      if (sortCodeErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.sortcode-required'));
      }
      if (sortCodeErrors.fixedLength) {
        errorMessages.push(this.translationService.get('errorMessages.sortcode-length'));
      }
    }

    if (accountNumberErrors) {
      if (accountNumberErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.accountnumber-required'));
      }
      if (accountNumberErrors.fixedLength) {
        errorMessages.push(this.translationService.get('errorMessages.accountnumber-length'));
      }
    }

    if (accountNameErrors) {
      if (accountNameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.accountname-required'));
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
