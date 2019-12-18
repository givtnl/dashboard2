import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessages } from 'src/app/infrastructure/enums/error-messages.enum';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  public loading = false;
  public isValidEmail = false;
  public isValidPassword = false;

  public errorMessages = null;

  constructor(
    private fb: FormBuilder,
    private translationService: TranslateService,
    private accountService: AccountService,
    private router: Router,
    private applicationStateService: ApplicationStateService
  ) {}

  ngOnInit() {

    this.applicationStateService.clear();

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    this.submitted = this.form.invalid;

    this.isValidEmail = this.form.get('email').valid;
    this.isValidPassword = this.form.get('password').valid;

    this.errorMessages = new Array<Observable<string>>();

    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    } else {
      this.loading = true;
      this.submitted = false;
      this.accountService
        .login(this.form.value.email, this.form.value.password)
        .pipe(catchErrorStatus(400, x => this.handleInvalidLogin(x)))
        .subscribe(resp =>
          this.router
            .navigate(['/', 'dashboard', 'root', { outlets: { 'dashboard-outlet': ['home'] } }])
            .finally(() => (this.loading = false))
        );
    }
  }
  handleInvalidLogin(error: HttpErrorResponse) {
    this.loading = false;
    switch (error.error.error_status) {
      case ErrorMessages.AccountDisabled:
        {
          this.errorMessages.push(this.translationService.get('errorMessages.accountDisabled'));
        }
        break;
      case ErrorMessages.LockedOut:
        {
          this.errorMessages.push(this.translationService.get('errorMessages.lockedOut'));
        }
        break;
      case ErrorMessages.OneAttemptLeft:
        {
          this.errorMessages.push(this.translationService.get('errorMessages.wrongEmailOrPassword'));
          this.errorMessages.push(this.translationService.get('errorMessages.oneAttemptLeft'));
        }
        break;
      case ErrorMessages.TwoAttemptsLeft:
        {
          this.errorMessages.push(this.translationService.get('errorMessages.wrongEmailOrPassword'));
          this.errorMessages.push(this.translationService.get('errorMessages.twoAttemptLeft'));
        }
        break;
      default:
        this.errorMessages.push(this.translationService.get('errorMessages.wrongEmailOrPassword'));
        return;
    }
  }
  handleInvalidForm() {
    const emailErrors = this.form.get('email').errors;
    const passwordErrors = this.form.get('password').errors;

    if (emailErrors) {
      if (emailErrors.required) {
        this.errorMessages.push(this.translationService.get('errorMessages.email-required'));
      }
      if (emailErrors.email) {
        this.errorMessages.push(this.translationService.get('errorMessages.email-not-an-email'));
      }
    }
  }
}
