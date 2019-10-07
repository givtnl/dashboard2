import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { BankAccountType } from 'src/app/infrastructure/enums/bank-account-type.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-onboarding-bank-account-holder-completed',
  templateUrl: './onboarding-bank-account-holder-completed.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-holder-completed.component.scss']
})
export class OnboardingBankAccountHolderCompletedComponent implements OnInit {

  public bankAccountType: BankAccountType
  public oldDashboardUrl = environment.oldDashboardUrl

  constructor(private stateService: ApplicationStateService) {

  }

  ngOnInit() {

  }

}

