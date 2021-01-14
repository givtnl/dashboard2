import { Component } from '@angular/core';
import { OnboardingBankAccountHolderStateService } from '../../bank-account-holder/services/onboarding-bank-account-holder-state.service';
import { PaymentProvider } from '../models/payment-provider.enum';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';

@Component({
  selector: 'app-onboarding-bank-account-signing-complete',
  templateUrl: './onboarding-bank-account-signing-complete.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-complete.component.scss']
})
export class OnboardingBankAccountSigningCompleteComponent {

  paymentProvider: PaymentProvider

  constructor(stateService: OnboardingBankAccountSigningStateService) {
    this.paymentProvider = stateService.currentBankAccountHolderDetailModel.PaymentProvider
  }
}
