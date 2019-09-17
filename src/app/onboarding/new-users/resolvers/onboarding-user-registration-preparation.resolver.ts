import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserRegistrationResponseModel } from '../models/user-registration-response.model';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { OnboardingNewUsersService } from '../services/onboarding-new-users.service';


@Injectable({
  providedIn: 'root'
})
export class OnboardingUserRegistrationPreparationResolver implements Resolve<UserRegistrationResponseModel> {
  /**
   *
   */
  constructor(private service: OnboardingNewUsersService, private router: Router) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UserRegistrationResponseModel | Observable<UserRegistrationResponseModel> | Promise<UserRegistrationResponseModel> {
    const collectGroupId = route.queryParams.collectGroupId as string;
    const emailAddress = route.queryParams.emailAddress as string;
    return this.service
      .prepareUser(collectGroupId, emailAddress)
      .pipe(catchErrorStatus(401, () => this.router.navigate(['/', 'system-module', 'not-found'])));
  }
}
