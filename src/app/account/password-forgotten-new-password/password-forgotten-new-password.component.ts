import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password-forgotten-new-password',
  templateUrl: './password-forgotten-new-password.component.html',
  styleUrls: ['./password-forgotten-new-password.component.scss']
})
export class PasswordForgottenNewPasswordComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public submitted = false;
  public loading = false;
  public isValidPassword = false;
  private ngUnsubscribe = new Subject<void>();
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
      password: [null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$/)]]
    });
  }

  submit() {
    this.submitted = this.form.invalid;
    this.isValidPassword = this.form.get('password').valid;

    this.errorMessages = new Array<Observable<string>>();

    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    } else {
      this.loading = true;
      this.submitted = false;
      this.accountService.passwordResetConfirm(this.form.getRawValue()).pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe(
        () => this.router.navigate(['/', 'account', 'password-forgotten', 'completed']),
        error =>
          this.router
            .navigate(['system', 'root', { outlets: { 'system-outlet': ['error'] } }], {
              queryParams: {
                error: 'errorMessages.passwordResetLinkExpired'
              }
            })
            .finally(() => (this.loading = false))
      );
    }
  }

  handleInvalidForm() {
    const passwordErrors = this.form.get('password').errors;

    if (passwordErrors) {
      if (passwordErrors.required) {
        this.errorMessages.push(this.translationService.get('errorMessages.password-required'));
      }
      if (passwordErrors.pattern) {
        this.errorMessages.push(this.translationService.get('errorMessages.password-pattern'));
      }
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}
}
