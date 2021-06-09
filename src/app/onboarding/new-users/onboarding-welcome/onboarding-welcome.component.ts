import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { OnboardingNewUsersStateService } from '../services/onboarding-new-users-state.service';
import mixpanel from 'mixpanel-browser';


@Component({
    selector: 'app-onboarding-welcome',
    templateUrl: './onboarding-welcome.component.html',
    styleUrls: ['../../onboarding.module.scss', './onboarding-welcome.component.scss']
})
export class OnboardingWelcomeComponent implements OnInit {
    public form: FormGroup;

    public get showPassword(): boolean {
        return (
            this.stateService.currentPreparationModel &&
            this.stateService.currentPreparationModel.RequiredInputs &&
            this.stateService.currentPreparationModel.RequiredInputs.some(x => x === 'Password')
        );
    }

    constructor(
        private translationService: TranslateService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
        public stateService: OnboardingNewUsersStateService
    ) { }

    ngOnInit() {
        this.stateService.currentPreparationModel = this.route.parent.snapshot.data.preparation;
        this.stateService.currentOnboardingRequest = this.route.parent.snapshot.data.request;

        mixpanel.identify(this.stateService.currentOnboardingRequest.emailAddress);
        mixpanel.track("onboarding:begin");

        this.form = this.formBuilder.group({
            email: [{
                value: this.stateService.currentOnboardingRequest.emailAddress,
                disabled: true
            }, [Validators.required, Validators.email]],
            password: [null, this.showPassword ? [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{7,}$/)
            ] : []]
        });
    }

    submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        const currentRegisterModel = this.stateService.currentRegisterModel || { email: null, password: null };
        currentRegisterModel.email = this.form.getRawValue().email;
        currentRegisterModel.password = this.form.value.password;

        this.stateService.currentRegisterModel = currentRegisterModel;
        this.router.navigate(['/', 'onboarding', 'welcome', 'new-users', { outlets: { 'onboarding-outlet': ['register'] } }], {
            queryParamsHandling: 'merge'
        });
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
            if (passwordErrors.minlength || passwordErrors.pattern) {
                errorMessages.push(this.translationService.get('errorMessages.password-min-length'));
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
