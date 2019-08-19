import { Resolve, RouterStateSnapshot, Router } from '@angular/router';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { Observable } from 'rxjs';
import { ToastrModule } from 'ngx-toastr';

export class OnboardingTokenResolver implements Resolve<OnboardingRequestModel> {
	/**
     *
     */
	constructor(private router: Router, private toastr: ToastrModule) {}
	resolve(
		ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): OnboardingRequestModel | Observable<OnboardingRequestModel> | Promise<OnboardingRequestModel> {
		// todo parse from query and store in our stateService
		return {
			companyName: 'test',
			token: 'test-token'
		};
	}
}
