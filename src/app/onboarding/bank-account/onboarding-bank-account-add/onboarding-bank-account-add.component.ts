import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { fixedLengthValidator } from '../../../shared/validators/fixed-length.validator';

@Component({
  selector: 'app-onboarding-bank-account-add',
  templateUrl: './onboarding-bank-account-add.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-add.component.scss']
})
export class OnboardingBankAccountAddComponent implements OnInit {
  public orgCountry: string = 'GB';

  public form: FormGroup;
  public loading = false;

  constructor(
    private translationService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,

  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      iban: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(34)]],
      sortCode: [null, [Validators.required, fixedLengthValidator(6)]],
      accountNumber: [null, [Validators.required, fixedLengthValidator(8)]],
      name: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.loading = true;
    // this.service
    //   .addBankAccount(this.form.value)
    //   .subscribe(x => this.router.navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['authorized'] } }]))
    //   .add(() => (this.loading = false));
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const nameErrors = this.form.get('name').errors;
    const ibanErrors = this.form.get('iban').errors;
    if (ibanErrors) {
      if (ibanErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.iban-required'));
      }
      if (ibanErrors.minlength) {
        errorMessages.push(this.translationService.get('errorMessages.iban-min-length'));
      }
      if (ibanErrors.maxlength) {
        errorMessages.push(this.translationService.get('errorMessages.iban-max-length'));
      }
    }
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

    if (nameErrors) {
      if (nameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.account-name-required'));
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
