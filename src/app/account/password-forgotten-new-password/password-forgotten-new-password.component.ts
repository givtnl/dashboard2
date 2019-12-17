import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-forgotten-new-password',
  templateUrl: './password-forgotten-new-password.component.html',
  styleUrls: ['./password-forgotten-new-password.component.scss']
})
export class PasswordForgottenNewPasswordComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  public loading = false;
  public isValidEmail = false;
  public isValidPassword = false;

  public errorMessages = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private translationService: TranslateService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentModel = this.route.snapshot.data.model;

    this.form = this.fb.group({
      email: [
        {
          value: currentModel.email,
          disabled: true
        },
        [Validators.required, Validators.email]
      ],
      code: [currentModel.code],
      password: [null, [Validators.required, Validators.pattern('(?=.*\d)(?=.*[A-Z])(?=.*\W)')]]
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
        .passwordResetConfirm(this.form.getRawValue())
        .subscribe(() => this.router.navigate(['/', 'account', 'password-forgotten', 'completed']).finally(() => (this.loading = false)));
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

    if (passwordErrors) {
      if (passwordErrors.required) {
        this.errorMessages.push(this.translationService.get('errorMessages.password-required'));
      }
      if (passwordErrors.pattern) {
        this.errorMessages.push(this.translationService.get('errorMessages.password-pattern'));
      }
    }
  }
}
