import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Injectable } from '@angular/core';
import { RegisterOnboardingModel } from '../models/register-onboarding.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class OnboardingService {
	constructor(private backendService: BackendService) {}

	complete(onboardingModel: RegisterOnboardingModel): Observable<object> {
		return this.backendService.post(`collectgroups/${onboardingModel.collectGroupId}/users`, onboardingModel);
	}
}
