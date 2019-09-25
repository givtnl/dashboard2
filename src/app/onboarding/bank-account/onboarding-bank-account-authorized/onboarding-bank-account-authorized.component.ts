import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-onboarding-bank-account-authorized',
  templateUrl: './onboarding-bank-account-authorized.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-authorized.component.scss']
})
export class OnboardingBankAccountAuthorizedComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private translationService: TranslateService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName:[null,[Validators.required, Validators.maxLength(50)]],
      email:[null,[Validators.required, Validators.email, Validators.maxLength(70)]]
    })
  }

  submit(){
    if (this.form.invalid){
      this.handleInvalidForm();
      return;
    }
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const firstNameErrors = this.form.get('firstName').errors;
    const lastNameErrors = this.form.get('lastName').errors;
    const emailErrors = this.form.get('email').errors;

    if (lastNameErrors) {
      if (lastNameErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.lastName-required'));
      }
      if (lastNameErrors.minLength) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-min-length'));
      }

      if (lastNameErrors.maxLength) {
        errorMessages.push(this.translationService.get('errorMessages.last-name-max-length'));
      }
    }

    if (emailErrors) {
      if (emailErrors.required) {
        errorMessages.push(this.translationService.get('errorMessages.email-required'));
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
      .pipe(tap(results => (resolvedErrorMessages = results)))
      .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
      .subscribe(title =>
        this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
          enableHtml: true
        })
      );
  }
}
