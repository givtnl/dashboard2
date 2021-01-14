import { Component, OnInit } from '@angular/core';
import { PaymentProvider } from '../models/payment-provider.enum';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';

@Component({
  selector: 'app-onboarding-bank-account-signing-intro-direct-debit-guarantee',
  templateUrl: './onboarding-bank-account-signing-intro-direct-debit-guarantee.component.html',
  styleUrls: ['./onboarding-bank-account-signing-intro-direct-debit-guarantee.component.scss']
})
export class OnboardingBankAccountSigningIntroDirectDebitGuaranteeComponent implements OnInit {

  paymentProvider: PaymentProvider

  constructor(private stateService: OnboardingBankAccountSigningStateService) {
  }

  ngOnInit() {
    this.paymentProvider = this.stateService.currentBankAccountHolderDetailModel.PaymentProvider
  }

}
