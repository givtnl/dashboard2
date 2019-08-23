import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OnboardingStateService } from '../services/onboarding-state.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OnboardingService } from '../services/onboarding.service';
import { Observable, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { tap, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-onboarding-personal-details',
    templateUrl: './onboarding-personal-details.component.html',
    styleUrls: ['./onboarding-personal-details.component.scss']
})
export class OnboardingPersonalDetailsComponent implements OnInit {
    public form: FormGroup;
    public loading = false;
    constructor(
        private translationService: TranslateService,
        private formBuilder: FormBuilder,
        private stateService: OnboardingStateService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: [this.stateService.currentRegisterModel ? this.stateService.currentRegisterModel.firstName : null, [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
            lastName: [this.stateService.currentRegisterModel ? this.stateService.currentRegisterModel.lastName : null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
        });
    }

    submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        const currentRegisterModel = this.stateService.currentRegisterModel;
        currentRegisterModel.firstName = this.form.value.firstName;
        currentRegisterModel.lastName = this.form.value.lastName;
        currentRegisterModel.collectGroupId = this.stateService.currentOnboardingRequest.collectGroupId;
        this.stateService.currentRegisterModel = currentRegisterModel;

        this.router.navigate(['/', 'onboarding', 'completed'], {
            queryParamsHandling: 'merge'
        });
    }

    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const firstNameErrors = this.form.get('firstName').errors;
        const lastNameErrors = this.form.get('lastName').errors;

        if (firstNameErrors) {
            if (firstNameErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.first-name-required'));
            }
            if (firstNameErrors.minlength) {
                errorMessages.push(this.translationService.get('errorMessages.first-name-min-length'));
            }
            if (firstNameErrors.maxlength) {
                errorMessages.push(this.translationService.get('errorMessages.first-name-max-length'));
            }
        }

        if (lastNameErrors) {
            if (lastNameErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.last-name-required'));
            }
            if (lastNameErrors.minlength) {
                errorMessages.push(this.translationService.get('errorMessages.last-name-min-length'));
            }
            if (lastNameErrors.maxlength) {
                errorMessages.push(this.translationService.get('errorMessages.last-name-max-length'));
            }
        }
        this.loading = true;
        forkJoin(errorMessages)
            .pipe(tap(results => (resolvedErrorMessages = results)))
            .pipe(tap(results => console.log(results)))
            .pipe(switchMap(() => this.translationService.get('errorMessages.validation-errors')))
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            )
            .add(() => (this.loading = false));
    }
}
