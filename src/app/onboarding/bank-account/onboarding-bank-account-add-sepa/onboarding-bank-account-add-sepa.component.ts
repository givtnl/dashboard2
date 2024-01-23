import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OnboardingBankAccountStateService } from '../services/onboarding-bank-account-state.service';
import { ibanValidator } from 'src/app/shared/validators/iban.validator';
import { BankAccountListModel } from 'src/app/bank-accounts/models/bank-account-list.model';

@Component({
    selector: 'app-onboarding-bank-account-add-sepa',
    templateUrl: './onboarding-bank-account-add-sepa.component.html',
    styleUrls: ['../../onboarding.scss', './onboarding-bank-account-add-sepa.component.scss']
})
export class OnboardingBankAccountAddSepaComponent implements OnInit, OnDestroy {
    public loading = false;
    public form: UntypedFormGroup;
    private ngUnsubscribe = new Subject<void>();
    constructor(
        private translationService: TranslateService,
        private formBuilder: UntypedFormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private stateService: OnboardingBankAccountStateService
    ) { }

    ngOnInit() {
        const currentBankDetails = this.route.parent.snapshot.data.bankaccount as BankAccountListModel;

        this.form = this.formBuilder.group({
            iban: [currentBankDetails == null ? null : currentBankDetails.Iban, [Validators.required, ibanValidator()]],
            accountName: [currentBankDetails == null ? null : currentBankDetails.AccountName, [Validators.required, Validators.minLength(3)]],
        });
    }

    submit() {
        if (this.form.invalid) {
            this.handleInvalidForm();
            return;
        }
        this.stateService.currentBankAccountModel = this.form.value;
        this.loading = true;
        this.router
            .navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['completed'] } }])
            .finally(() => (this.loading = false));
    }

    handleInvalidForm() {
        let errorMessages = new Array<Observable<string>>();
        let resolvedErrorMessages = new Array<string>();

        const accountNameErrors = this.form.get('accountName').errors;
        const ibanErrors = this.form.get('iban').errors;

        if (ibanErrors) {
            if (ibanErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.iban-required'));
            }
            if (ibanErrors.checksum) {
                errorMessages.push(this.translationService.get('errorMessages.iban-checksum'));
            }
        }

        if (accountNameErrors) {
            if (accountNameErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.accountname-required'));
            }
            if (accountNameErrors.minlength) {
                errorMessages.push(this.translationService.get('errorMessages.accountname-min-length'));
            }
        }

        forkJoin(errorMessages)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                tap(results => (resolvedErrorMessages = results)),
                switchMap(_ => this.translationService.get('errorMessages.validation-errors'))
            )
            .subscribe(title =>
                this.toastr.warning(resolvedErrorMessages.join('<br>'), title, {
                    enableHtml: true
                })
            );
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
