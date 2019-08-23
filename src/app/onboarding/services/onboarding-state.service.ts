import { Injectable } from '@angular/core';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { CreateUserForCollectGroupCommand } from '../models/commands/create-user-for-collect-group.command';
import { UserRegistrationResponseModel } from '../models/user-registration-response.model';



@Injectable({
	providedIn: 'root'
})
export class OnboardingStateService {
	public get currentPreparationModel(): UserRegistrationResponseModel {
		const key = 'OnboardingStateService.CurrentPreparationModel';
		const serializedRequest = JSON.parse(localStorage.getItem(key));
		return serializedRequest;
	}

	public set currentPreparationModel(value: UserRegistrationResponseModel) {
		const key = 'OnboardingStateService.CurrentPreparationModel';
		localStorage.setItem(key, JSON.stringify(value));
	}


	public get currentOnboardingRequest(): OnboardingRequestModel {
		const key = 'OnboardingStateService.CurrentOnBoardingRequest';
		const serializedRequest = JSON.parse(localStorage.getItem(key));
		return serializedRequest;
	}
	public set currentOnboardingRequest(value: OnboardingRequestModel) {
		const key = 'OnboardingStateService.CurrentOnBoardingRequest';
		localStorage.setItem(key, JSON.stringify(value));
	}

	public get currentRegisterModel(): CreateUserForCollectGroupCommand {
		const key = 'OnboardingStateService.RegisterOnboardingModel';
		const serializedRequest = JSON.parse(localStorage.getItem(key));
		return serializedRequest;
	}

	public set currentRegisterModel(value: CreateUserForCollectGroupCommand) {
		const key = 'OnboardingStateService.RegisterOnboardingModel';
		localStorage.setItem(key, JSON.stringify(value));
	}
}
