import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onboarding-bank-account-signing-complete',
  templateUrl: './onboarding-bank-account-signing-complete.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-signing-complete.component.scss']
})
export class OnboardingBankAccountSigningCompleteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  close() {
    window.close();
  }

}