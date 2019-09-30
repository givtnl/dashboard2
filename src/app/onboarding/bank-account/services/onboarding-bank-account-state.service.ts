import { Injectable } from '@angular/core';

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
        this.storage.setItem(key, JSON.stringify(value));
    }
}
