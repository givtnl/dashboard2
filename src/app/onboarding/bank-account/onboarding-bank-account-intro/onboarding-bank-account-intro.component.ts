import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-bank-account-intro',
  templateUrl: './onboarding-bank-account-intro.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-intro.component.scss']
})
export class OnboardingBankAccountIntroComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {

  }

  startBankAccount() {
    this.router.navigate(['/', 'onboarding', 'bank-account', { outlets: { 'onboarding-outlet': ['add'] } }], {
      queryParamsHandling: 'merge'
    });
  }
}
