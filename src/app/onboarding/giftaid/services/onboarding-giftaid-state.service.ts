import { Injectable } from '@angular/core';
import { CreateGiftAidSettingsCommand } from '../models/create-giftaid-settings.command';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidStateService {
    private storage = sessionStorage;

    public clear():void{
        this.storage.removeItem('OnboardingGiftAidStateService.currentGiftAidSettings');
        this.storage.removeItem('OnboardingGiftAidStateService.validatedAndCompletedStepOne');
        this.storage.removeItem('OnboardingGiftAidStateService.validatedAndCompletedStepTwo');
        this.storage.removeItem('OnboardingGiftAidStateService.validatedAndCompletedStepThree')
        this.storage.removeItem('OnboardingGiftAidStateService.validatedAndCompletedStepFour')
    }
    
    public get validatedAndCompletedStepFour(): boolean {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepFour';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || false;
    }

    public set validatedAndCompletedStepFour(value: boolean) {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepFour';
        this.storage.setItem(key, JSON.stringify(value));
    }

    public get validatedAndCompletedStepThree(): boolean {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepThree';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || false;
    }

    public set validatedAndCompletedStepThree(value: boolean) {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepThree';
        this.storage.setItem(key, JSON.stringify(value));
    }

    public get validatedAndCompletedStepTwo(): boolean {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepTwo';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || false;
    }

    public set validatedAndCompletedStepTwo(value: boolean) {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepTwo';
        this.storage.setItem(key, JSON.stringify(value));
    }

    public get validatedAndCompletedStepOne(): boolean {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepOne';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || false;
    }

    public set validatedAndCompletedStepOne(value: boolean) {
        const key = 'OnboardingGiftAidStateService.validatedAndCompletedStepOne';
        this.storage.setItem(key, JSON.stringify(value));
    }
    
    public get currentGiftAidSettings(): CreateGiftAidSettingsCommand {
        const key = 'OnboardingGiftAidStateService.currentGiftAidSettings';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || {};
    }

    public set currentGiftAidSettings(value: CreateGiftAidSettingsCommand) {
        const key = 'OnboardingGiftAidStateService.currentGiftAidSettings';
        this.storage.setItem(key, JSON.stringify(value));
    }
}
