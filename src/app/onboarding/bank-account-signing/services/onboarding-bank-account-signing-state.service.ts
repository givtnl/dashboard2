import { Injectable } from '@angular/core';
import { BankAccountHolderDetailModel } from '../models/bank-account-holder-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountSigningStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingBankAccountSigningStateService.currentBankAccountHolderDetailModel');
  }

  public get currentBankAccountHolderDetailModel(): BankAccountHolderDetailModel {
    const key = 'OnboardingBankAccountSigningStateService.currentBankAccountHolderDetailModel';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  public set currentBankAccountHolderDetailModel(value: BankAccountHolderDetailModel) {
    const key = 'OnboardingBankAccountSigningStateService.currentBankAccountHolderDetailModel';
    this.storage.setItem(key, JSON.stringify(value));
  }
}
