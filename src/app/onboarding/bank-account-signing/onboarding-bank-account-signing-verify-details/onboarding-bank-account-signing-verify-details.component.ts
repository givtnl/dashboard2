import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OnboardingBankAccountSigningStateService } from '../services/onboarding-bank-account-signing-state.service';
import { BankAccountHolderDetailModel } from '../models/bank-account-holder-detail.model';

@Component({
  selector: 'app-onboarding-bank-account-signing-verify-details',
  templateUrl: './onboarding-bank-account-signing-verify-details.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-verify-details.component.scss']
})
export class OnboardingBankAccountSigningVerifyDetailsComponent implements OnInit {
  public form: FormGroup;
public accountHolderDetails: BankAccountHolderDetailModel;
  constructor(private formBuilder: FormBuilder, private router: Router,public stateService: OnboardingBankAccountSigningStateService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      detailsCorrect: [null, [Validators.required]]
    });

    this.accountHolderDetails = this.stateService.currentBankAccountHolderDetailModel;

    this.form.valueChanges.subscribe(x => {
      if (x.detailsCorrect) {
        this.router.navigate(
          ['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['direct-debit-guarantee'] } }],
          {
            queryParamsHandling: 'merge'
          }
        );
      } else {
        this.router.navigate(['/', 'onboarding', 'bank-account-signing', { outlets: { 'onboarding-outlet': ['details-incorrect'] } }], {
          queryParamsHandling: 'merge'
        });
      }
    });
  }
}
