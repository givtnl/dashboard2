import { Resolve, RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn:'root'
})
export class OnboardingRequestResolver implements Resolve<OnboardingRequestModel> {
	/**
     *
     */
	constructor(private router: Router, private toastr: ToastrService) {}
	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): OnboardingRequestModel | Observable<OnboardingRequestModel> | Promise<OnboardingRequestModel> {
		const token = route.queryParams.token as string;
		const companyName = route.queryParams.cgname as string;

		if (!token || !companyName) {
			this.router.navigate([ '/', 'system', 'not-found' ]);
			this.toastr.warning('Oooops', ' todo translate : Ongeldige query params');
		}

		return {
			token,
			companyName
		};
	}
}
