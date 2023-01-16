import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-password-forgotten',
    templateUrl: './password-forgotten.component.html',
    styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent implements OnInit, OnDestroy {
    public form: FormGroup;
    public submitted = false;
    public loading = false;
    public isValidEmail = false;
    public isValidPassword = false;
    private ngUnsubscribe = new Subject<void>();
    public errorMessages: Array<string>;

    constructor(
        private fb: FormBuilder,
        private translationService: TranslateService,
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]]
        });
    }

    submit() {
        this.submitted = this.form.invalid;

        this.isValidEmail = this.form.get('email').valid;

        this.errorMessages = new Array<string>();

        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        } else {
            this.loading = true;
            this.submitted = false;
            this.accountService
                .passwordReset(this.form.value.email).pipe(
                    takeUntil(this.ngUnsubscribe)
                )
                .subscribe(
                    _ => this.router.navigate(['/', 'account', 'password-forgotten', 'mail-sent']),
                    async _ => this.errorMessages.push(await this.translationService.get('errorMessages.email-not-known').toPromise()))
                .add(() => this.loading = false);
                
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
