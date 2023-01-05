import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Observable, Subject } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { ErrorMessages } from 'src/app/infrastructure/enums/error-messages.enum';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
    public form: FormGroup;
    public submitted = false;
    public loading = false;
    public isValidEmail = false;
    public isValidPassword = false;
    private ngUnsubscribe = new Subject<void>();
    public errorMessages = null;

    constructor(
        private fb: FormBuilder,
        private translationService: TranslateService,
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {

        sessionStorage.clear();

        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]]
        });
    }

    submit() {
        this.submitted = this.form.invalid;

        this.isValidEmail = this.form.get('email').valid;
        this.isValidPassword = this.form.get('password').valid;

        this.errorMessages = new Array<string>();

        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        } else {
            this.loading = true;
            this.submitted = false;
            this.accountService
                .login(this.form.value.email, this.form.value.password)
                .pipe(
                    catchErrorStatus(400, x => this.handleInvalidLogin(x.error.error.error_status || ErrorMessages.UnExpectedError)),
                    takeUntil(this.ngUnsubscribe))
                .subscribe(resp =>
                    this.router
                        .navigate(['/', 'dashboard', 'root', { outlets: { 'dashboard-outlet': ['home'] } }])
                        .catch(error => this.handleInvalidLogin(error.error_status || ErrorMessages.UnExpectedError))
                        .finally(() => (this.loading = false))
                ).add(() => this.loading = false);
        }
    }

    async handleInvalidLogin(errorNumber: number) {
        this.loading = false;
        switch (errorNumber) {
            case ErrorMessages.AccountDisabled:
                this.errorMessages.push(await this.translationService.get('errorMessages.accountDisabled').toPromise());
                break;
            case ErrorMessages.LockedOut:
                this.errorMessages.push(await this.translationService.get('errorMessages.lockedOut').toPromise());
                break;
            case ErrorMessages.OneAttemptLeft:
                {
                    this.errorMessages.push(await this.translationService.get('errorMessages.wrongEmailOrPassword').toPromise());
                    this.errorMessages.push(await this.translationService.get('errorMessages.oneAttemptLeft').toPromise());
                }
                break;
            case ErrorMessages.TwoAttemptsLeft:
                {
                    this.errorMessages.push(await this.translationService.get('errorMessages.wrongEmailOrPassword').toPromise());
                    this.errorMessages.push(await this.translationService.get('errorMessages.twoAttemptLeft').toPromise());
                }
                break;
            case ErrorMessages.TempUser:
                this.errorMessages.push(await this.translationService.get('errorMessages.tempUser').toPromise());
                break;
            default:
                this.errorMessages.push(await this.translationService.get('errorMessages.wrongEmailOrPassword').toPromise());
                return;
        }
    }

    async handleInvalidForm() {
        const emailErrors = this.form.get('email').errors;

        if (emailErrors) {
            if (emailErrors.required) {
                this.errorMessages.push(await this.translationService.get('errorMessages.email-required').toPromise());
            }
            if (emailErrors.email) {
                this.errorMessages.push(await this.translationService.get('errorMessages.email-not-an-email').toPromise());
            }
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
