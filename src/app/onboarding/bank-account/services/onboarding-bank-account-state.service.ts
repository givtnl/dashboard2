import { Injectable } from '@angular/core';
import { AddBankAccountToOrganisationCommand } from '../models/add-bank-account-to-organisation.command';
@Injectable({
    providedIn: 'root'
})
export class OnboardingBankAccountStateService {
    private storage = sessionStorage;

    public clear():void{
        this.storage.removeItem('OnboardingBankAccountStateService.currentBankAccountModel');
    }

    public get currentBankAccountModel(): AddBankAccountToOrganisationCommand {
        const key = 'OnboardingBankAccountStateService.currentBankAccountModel';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    public set currentBankAccountModel(value: AddBankAccountToOrganisationCommand) {
        const key = 'OnboardingBankAccountStateService.currentBankAccountModel';
        value.accountNumber = value.accountNumber?.replace(" ", "");
        value.iban = value.iban?.replace(" ", "");
        value.sortCode = value.sortCode?.replace(" ", "").replace("-","");
        this.storage.setItem(key, JSON.stringify(value));
    }
}
