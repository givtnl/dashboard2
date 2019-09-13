import { Injectable } from '@angular/core';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { CreateUserForCollectGroupCommand } from '../models/commands/create-user-for-collect-group.command';
import { UserRegistrationResponseModel } from '../models/user-registration-response.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingStateService {
    private storage = sessionStorage;

    public clear(): void {
        this.storage.removeItem('OnboardingStateService.CurrentPreparationModel');
		this.storage.removeItem('OnboardingStateService.CurrentOnBoardingRequest');
		this.storage.removeItem('OnboardingStateService.RegisterOnboardingModel');
    }

    public get currentPreparationModel(): UserRegistrationResponseModel {
        const key = 'OnboardingStateService.CurrentPreparationModel';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    public set currentPreparationModel(value: UserRegistrationResponseModel) {
        const key = 'OnboardingStateService.CurrentPreparationModel';
        this.storage.setItem(key, JSON.stringify(value));
    }

    public get currentOnboardingRequest(): OnboardingRequestModel {
        const key = 'OnboardingStateService.CurrentOnBoardingRequest';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }
    public set currentOnboardingRequest(value: OnboardingRequestModel) {
        const key = 'OnboardingStateService.CurrentOnBoardingRequest';
        this.storage.setItem(key, JSON.stringify(value));
    }

    public get currentRegisterModel(): CreateUserForCollectGroupCommand {
        const key = 'OnboardingStateService.RegisterOnboardingModel';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    public set currentRegisterModel(value: CreateUserForCollectGroupCommand) {
        const key = 'OnboardingStateService.RegisterOnboardingModel';
        this.storage.setItem(key, JSON.stringify(value));
    }
}
