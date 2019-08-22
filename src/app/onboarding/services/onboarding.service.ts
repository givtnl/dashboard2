import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Injectable } from '@angular/core';
import { CompleteRegisterOnboardingModel } from '../models/complete-register-onboarding.model';
import { Observable } from 'rxjs';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class OnboardingService {
	constructor(private backendService: BackendService) {}

	register(collectGroupId: string, email:string): Observable<OnboardingRequestModel> {
		var httpParams = new HttpParams();
		httpParams = httpParams.set('email', email);

		return this.backendService.get(`collectgroups/${collectGroupId}/users`, httpParams);
	}
	complete(onboardingModel: CompleteRegisterOnboardingModel): Observable<object> {
		return this.backendService.post(`collectgroups/${onboardingModel.collectGroupId}/users`, onboardingModel);
	}
}
