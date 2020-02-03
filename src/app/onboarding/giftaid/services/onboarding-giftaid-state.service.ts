import { Injectable } from '@angular/core';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidStateService {
    private storage = sessionStorage;

    public clear():void{
        this.storage.removeItem('OnboardingGiftAidStateService.currentGiftAidSettings');
        this.storage.removeItem('OnboardingGiftAidStateService.validatedAndCompletedOrganisationDetails');
    }

    public get validatedAndCompletedOrganisationDetails(): boolean {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedOrganisationDetails';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || false;
    }

    public set validatedAndCompletedOrganisationDetails(value: boolean) {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedOrganisationDetails';
        this.storage.setItem(key, JSON.stringify(value));
    }
    
    public get currentGiftAidSettings(): CreateGiftAidSettingsCommand {
        const key = 'OnboardingGiftAidStateService.currentGiftAidSettings';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    public set currentGiftAidSettings(value: CreateGiftAidSettingsCommand) {
        const key = 'OnboardingGiftAidStateService.currentGiftAidSettings';
        this.storage.setItem(key, JSON.stringify(value));
    }
}
