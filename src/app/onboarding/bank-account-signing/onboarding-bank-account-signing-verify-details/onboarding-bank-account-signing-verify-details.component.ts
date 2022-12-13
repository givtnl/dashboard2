import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';
import { BankAccountHolderDetailModel } from '../models/bank-account-holder-detail.model';
import { PaymentProvider } from '../models/payment-provider.enum';

@Component({
  selector: 'app-onboarding-bank-account-signing-verify-details',
  templateUrl: './onboarding-bank-account-signing-verify-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-verify-details.component.scss']
})
export class OnboardingBankAccountSigningVerifyDetailsComponent implements OnInit {
  public form: UntypedFormGroup;
  public accountHolderDetails: BankAccountHolderDetailModel;
  public paymentProvider: PaymentProvider;
  public isLoading = false;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, public stateService: OnboardingBankAccountSigningStateService) { 
    this.paymentProvider = stateService.currentBankAccountHolderDetailModel.PaymentProvider

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    this.accountHolderDetails = this.stateService.currentBankAccountHolderDetailModel;

    this.form.valueChanges.subscribe(x => {
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
}
