import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-bank-account-completed',
  templateUrl: './onboarding-bank-account-completed.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-completed.component.scss']
})
export class OnboardingBankAccountCompletedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToDashboard() {
    this.router.navigate(['/', 'dashboard', 'root', { outlets: { 'dashboard-outlet': ['home'] } }])
  }
}
