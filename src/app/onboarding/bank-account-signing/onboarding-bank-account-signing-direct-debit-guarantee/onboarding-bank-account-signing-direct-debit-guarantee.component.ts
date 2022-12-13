import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentProvider } from '../models/payment-provider.enum';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';

@Component({
  selector: 'app-onboarding-bank-account-signing-direct-debit-guarantee',
  templateUrl: './onboarding-bank-account-signing-direct-debit-guarantee.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-direct-debit-guarantee.component.scss']
})
export class OnboardingBankAccountSigningDirectDebitGuaranteeComponent implements OnInit {
  public loading = false;
  public form: UntypedFormGroup;
  paymentProvider: PaymentProvider;

  constructor(private formBuilder: UntypedFormBuilder, private router: Router, private stateService: OnboardingBankAccountSigningStateService) { 
    this.paymentProvider = stateService.currentBankAccountHolderDetailModel.PaymentProvider
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      acceptedDirectDebitGuarantee: [null, [Validators.requiredTrue]]
    });
  }

  handleAcceptOrRefusal(): void {
    this.loading = true;
    if (this.form.value.acceptedDirectDebitGuarantee){
      this.router.navigate(['/','onboarding','bank-account-signing',{outlets:{'onboarding-outlet':['completed']}}],{
        queryParamsHandling:'merge'
      }).finally(() => this.loading =false);
    }
  }
}
