import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnboardingStateService } from '../../new-users/services/onboarding-state.service';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OnboardingService } from '../../new-users/services/onboarding.service';
import { OnboardingRequestModel } from '../../new-users/models/onboarding-request.model';


@Component({
  selector: 'app-onboarding-bank-account-add',
  templateUrl: './onboarding-bank-account-add.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-add.component.scss']
})
export class OnboardingBankAccountAddComponent implements OnInit {

  private orgCountry: string = 'GB';

  public form: FormGroup;
  public loading = false;

  constructor(private translationService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: OnboardingService,
    private router: Router,
    public stateService: OnboardingStateService) { }

  ngOnInit() {
    if (this.orgCountry != 'GB') {
      this.form = this.formBuilder.group({
        iban: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(34)]],
        name: [null, [Validators.required]]
      });
    } else {
      this.form = this.formBuilder.group({
        sortCode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        accountNumber: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        name: [null, [Validators.required]]
      });
    }
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.loading = true;
    this.service
      .addBankAccount({
        name: this.form.get('name').value,
        sortCode: this.sortCode ? this.sortCode.value : null,
        accountNumber: this.accountNumber ? this.accountNumber.value : null,
        IBAN: this.iban ? this.iban.value : null
      })
      .subscribe(x =>
        this.router.navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['authorized'] } }])
      )
      .add(() => (this.loading = false));
  }
  get iban() {
    return this.form.get('iban')
  }
  get sortCode() {
    return this.form.get('sortCode')
  }
  get accountNumber() {
    return this.form.get('accountNumber')
  }
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const nameErrors = this.form.get('name').errors;
    if (this.orgCountry != "GB") {
      const ibanErrors = this.form.get('iban').errors;
      if (ibanErrors) {
        if (ibanErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.iban-required'));
        }
        if (ibanErrors.minlength) {
          errorMessages.push(this.translationService.get('errorMessages.iban-min-length'));
        }
        if (ibanErrors.maxlength) {
          errorMessages.push(this.translationService.get('errorMessages.iban-max-length'))
        }
      }

    } else {
      const sortCodeErrors = this.form.get('sortCode').errors;
      const accountNumberErrors = this.form.get('accountNumber').errors;
      console.log(this.form.get('sortCode'), '\n', this.form.get('accountNumber'))
      if (sortCodeErrors) {
        if (sortCodeErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.sortcode-required'));
        }
        if (sortCodeErrors.minlength || sortCodeErrors.maxlength) {
          this.translationService.get('errorMessages.sortcode-length')
            .subscribe(x => {
              if (!errorMessages.some(x)) {
                errorMessages.push(x);
              }
            })
        }
      }

      if (accountNumberErrors) {
        if (accountNumberErrors.required) {
          errorMessages.push(this.translationService.get('errorMessages.accountnumber-required'));
        }
        if (accountNumberErrors.minlength || accountNumberErrors.maxlength) {
          this.translationService.get('errorMessages.accountnumber-length')
            .subscribe(x => {
              if (!errorMessages.some(x)) {
                errorMessages.push(x);
              }
            })
        }
      }
    }

    if (nameErrors) {
      if (nameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.account-name-required'))
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
