import { Injectable } from '@angular/core';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { RegisterOnboardingModel } from '../models/register-onboarding.model';

@Injectable({
	providedIn: 'root'
})
export class OnboardingStateService {
	public get currentOnboardingRequest(): OnboardingRequestModel {
		const key = 'OnboardingStateService.CurrentOnBoardingRequest';
		const serializedRequest = JSON.parse(localStorage.getItem(key));
		return serializedRequest;
    }
    public set currentOnboardingRequest(value: OnboardingRequestModel){
        const key = 'OnboardingStateService.CurrentOnBoardingRequest';
        localStorage.setItem(key, JSON.stringify(value));
    }

    public get currentOnboardingRegistration(): RegisterOnboardingModel {
        const key = 'OnboardingStateService.CurrentOnboardingRegistration'
        return JSON.parse(localStorage.getItem(key))
    }

    public set currentOnboardingRegistration(value: RegisterOnboardingModel) {
        const key = 'OnboardingStateService.CurrentOnboardingRegistration'
        localStorage.setItem(key, JSON.stringify(value))
    }
}
