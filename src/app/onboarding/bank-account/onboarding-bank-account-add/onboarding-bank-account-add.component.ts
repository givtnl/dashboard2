import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, Subject } from 'rxjs';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { OnboardingBankAccountStateService } from '../services/onboarding-bank-account-state.service';
import { BankAccountListModel } from 'src/app/bank-accounts/models/bank-account-list.model';

@Component({
    selector: 'app-onboarding-bank-account-add',
    templateUrl: './onboarding-bank-account-add.component.html',
    styleUrls: ['../../onboarding.scss', './onboarding-bank-account-add.component.scss']
})
export class OnboardingBankAccountAddComponent implements OnInit, OnDestroy {
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
            sortCode: [currentBankDetails == null ? null : currentBankDetails.SortCode, [Validators.required, Validators.minLength(6)]],
            accountNumber: [currentBankDetails == null ? null : currentBankDetails.AccountNumber, [Validators.required, Validators.minLength(8)]],
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
        const sortCodeErrors = this.form.get('sortCode').errors;
        const accountNumberErrors = this.form.get('accountNumber').errors;

        if (sortCodeErrors) {
            if (sortCodeErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.sortcode-required'));
            }
            if (sortCodeErrors.minLength) {
                errorMessages.push(this.translationService.get('errorMessages.sortcode-length'));
            }
        }

        if (accountNumberErrors) {
            if (accountNumberErrors.required) {
                errorMessages.push(this.translationService.get('errorMessages.accountnumber-required'));
            }
            if (accountNumberErrors.minLength) {
                errorMessages.push(this.translationService.get('errorMessages.accountnumber-length'));
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
            .pipe(tap(results => (resolvedErrorMessages = results)))
            .pipe(switchMap(results => this.translationService.get('errorMessages.validation-errors')))
            .pipe(takeUntil(this.ngUnsubscribe))
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
