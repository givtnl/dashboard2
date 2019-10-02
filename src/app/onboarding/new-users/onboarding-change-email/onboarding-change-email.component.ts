import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingNewUsersService } from '../services/onboarding-new-users.service';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';
import { forbiddenValueValidator } from 'src/app/shared/validators/forbidden-value-validator';


@Component({
  selector: 'app-onboarding-change-email',
  templateUrl: 'onboarding-change-email.component.html',
  styleUrls: ['../../onboarding.module.scss', 'onboarding-change-email.component.scss']
})
export class OnboardingChangeEmailComponent implements OnInit {
  public form: FormGroup;
  public loading = false;
  public request: OnboardingRequestModel;

  constructor(
    private translationService: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: OnboardingNewUsersService,
    private router: Router,
    private route: ActivatedRoute,
    private stateService: OnboardingNewUsersStateService
  ) { }

  ngOnInit(): void {
    const currentRequest = this.route.parent.snapshot.data.request;

    this.stateService.currentOnboardingRequest = currentRequest;
    this.request = currentRequest;

    // todo retrieve email and companyname from route
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, forbiddenValueValidator(this.request.emailAddress)]],
      password: [null, [Validators.required, Validators.minLength(7)]]
    });
  }

  submit() {

    if (this.form.invalid) {
      this.handleInvalidForm();
      return;
    }
    this.loading = true;
    this.service
      .sendRegistrationMail(this.request.collectGroupId, {
        collectGroupId: this.request.collectGroupId,
        email: this.form.value.email,
        password: this.form.value.password,
        language: this.translationService.currentLang
      })
      .subscribe(x =>
        this.router.navigate(['/', 'onboarding', 'welcome', 'new-users', { outlets: { 'onboarding-outlet': ['check-inbox'] } }])
      )
      .add(() => (this.loading = false));
  }

  handleInvalidForm() {
    let errorMessages = new Array<Observable<string>>();
    let resolvedErrorMessages = new Array<string>();

    const emailErrors = this.form.get('email').errors;
    const passwordErrors = this.form.get('password').errors;

    if (emailErrors) {
      if (emailErrors.forbiddenValue) {
        errorMessages.push(this.translationService.get('errorMessages.email-not-duplicate'));
      }
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
