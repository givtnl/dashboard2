import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Observable } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading = false;

  constructor(private fb: FormBuilder, private translationService: TranslateService, private accountService: AccountService) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    } else {
      this.loading = true;
      this.accountService
        .login(this.form.value.email, this.form.value.password)
        .pipe(catchErrorStatus(400, this.handleInvalidLogin))
        .subscribe(resp => {
          console.log(resp);
        })
        .add(() => (this.loading = false));
    }
  }
  handleInvalidLogin() {
    console.log('invalid login');
  }
  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const emailErrors = this.form.get('email').errors;
    const passwordErrors = this.form.get('password').errors;

    if (emailErrors) {
      if (emailErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.email-required'));
      }
      if (emailErrors.email) {
        errorMessages.push(this.translationService.get('errorMessages.email-not-an-email'));
      }
    }

    if (passwordErrors) {
      if (passwordErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.password-required'));
      }
      if (passwordErrors.minlength) {
        errorMessages.push(this.translationService.get('errorMessages.password-min-length'));
      }
    }
  }
}
