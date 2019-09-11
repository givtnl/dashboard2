import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { OnboardingRequestModel } from '../models/onboarding-request.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnboardingStateService } from '../services/onboarding-state.service';

@Injectable({
    providedIn: 'root'
})
export class OnboardingRequestResolver implements Resolve<OnboardingRequestModel> {
    /**
     *
     */
    constructor(private stateService: OnboardingStateService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OnboardingRequestModel | Observable<OnboardingRequestModel> | Promise<OnboardingRequestModel> {
        const token = route.queryParams.token as string;
        const companyName = route.queryParams.cgname as string;
        const collectGroupId = route.queryParams.collectGroupId as string;
        const emailAddress = route.queryParams.emailAddress as string;

        let onboardingRequestModel = {
            emailAddress,
            token,
            companyName,
            collectGroupId
        };

        return onboardingRequestModel;
    }
}
