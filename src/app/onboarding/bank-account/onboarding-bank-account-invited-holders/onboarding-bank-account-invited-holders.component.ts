import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BankAccountHolderListModel } from 'src/app/bank-account-holders/models/bank-account-holder-list.model';

@Component({
  selector: 'app-onboarding-bank-account-invited-holders',
  templateUrl: './onboarding-bank-account-invited-holders.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-invited-holders.component.scss']
})
export class OnboardingBankAccountInvitedHoldersComponent implements OnInit {

  public accountHolders = new Array<BankAccountHolderListModel[]>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.accountHolders = this.activatedRoute.snapshot.data.accountHolders;
  }
}
