import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank-account-intro',
  templateUrl: './bank-account-intro.component.html',
  styleUrls: ['../../onboarding.module.scss', './bank-account-intro.component.scss']
})
export class BankAccountIntroComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {

  }

  startBankAccount() {
    this.router.navigate(['/', 'onboarding', 'infra', 'bank-account', { outlets: { 'onboarding-outlet': ['add'] } }], {
      queryParamsHandling: 'merge'
    });
  }
}
