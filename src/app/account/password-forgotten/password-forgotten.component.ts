import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit {
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
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  submit() {
    this.submitted = this.form.invalid;

    this.isValidEmail = this.form.get('email').valid;

    this.errorMessages = new Array<Observable<string>>();

    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    } else {
      this.loading = true;
      this.submitted = false;
      this.accountService
        .passwordReset(this.form.value.email)
        .subscribe(() => this.router.navigate(['/', 'account', 'password-forgotten', 'mail-sent']), error => {
          this.errorMessages.push(this.translationService.get('errorMessages.email-not-known'))
                  })
        .add(() => this.loading = false);
    }
  }

  handleInvalidForm() {
    const emailErrors = this.form.get('email').errors;
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
