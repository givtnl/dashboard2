import { Injectable } from '@angular/core';
import { BankAccountListModel } from 'src/app/bank-accounts/models/bank-account-list.model';


@Injectable({
    providedIn: 'root'
})
export class OnboardingBankAccountHolderStateService {
    private storage = sessionStorage;

    public clear():void{
        this.storage.removeItem('OnboardingBankAccountHolderStateService.currentBankAccountListModel');
        this.storage.removeItem('OnboardingBankAccountHolderStateService.currentInvitationModel')
    }

    public get currentBankAccountListModel(): BankAccountListModel {
        const key = 'OnboardingBankAccountHolderStateService.currentBankAccountListModel';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    public set currentBankAccountListModel(value: BankAccountListModel) {
        const key = 'OnboardingBankAccountHolderStateService.currentBankAccountListModel';
        this.storage.setItem(key, JSON.stringify(value));
    }
    
    public get currentInvitationModel(): InviteBankAccountHolderToSignMandateCommand {
        const key = 'OnboardingBankAccountHolderStateService.currentInvitationModel';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    public set currentInvitationModel(value: InviteBankAccountHolderToSignMandateCommand) {
        const key = 'OnboardingBankAccountHolderStateService.currentInvitationModel';
        this.storage.setItem(key, JSON.stringify(value));
    }
}
