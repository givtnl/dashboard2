import { Injectable } from '@angular/core';
import { OnboardingRequestModel } from '../models/onboarding-request.model';

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
}
