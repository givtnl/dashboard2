import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OnboardingService } from '../services/onboarding.service';
import { UserRegistrationResponse } from '../models/user-registration-response.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingRequestResolver implements Resolve<UserRegistrationResponse> {
    /**
     *
     */
    constructor(private service: OnboardingService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UserRegistrationResponse | Observable<UserRegistrationResponse> | Promise<UserRegistrationResponse> {
        const collectGroupId = route.queryParams.collectGroupId as string;
        const emailAddress = route.queryParams.emailAddress as string;
        return this.service.prepareUser(collectGroupId, emailAddress);
    }
}
