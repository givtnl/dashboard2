import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';
import { BankAccountHolderDetailModel } from '../models/bank-account-holder-detail.model';
import { PaymentProvider } from '../models/payment-provider.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-onboarding-bank-account-signing-verify-details',
  templateUrl: './onboarding-bank-account-signing-verify-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-verify-details.component.scss']
})
export class OnboardingBankAccountSigningVerifyDetailsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public accountHolderDetails: BankAccountHolderDetailModel;
  public paymentProvider: PaymentProvider;
  public isLoading = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(private formBuilder: FormBuilder, private router: Router, public stateService: OnboardingBankAccountSigningStateService) { 
    this.paymentProvider = stateService.currentBankAccountHolderDetailModel.PaymentProvider

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    this.accountHolderDetails = this.stateService.currentBankAccountHolderDetailModel;

    this.form.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(x => {
      if (x.detailsCorrect) {
        this.router.navigate(
          ['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['sign-agreement'] } }],
          {
            queryParamsHandling: 'merge'
          }
        );
      } else {
        this.isLoading = true
        this.router.navigate(['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['details-incorrect'] } }], {
          queryParamsHandling: 'merge'
        }).finally(() => this.isLoading = false)
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
