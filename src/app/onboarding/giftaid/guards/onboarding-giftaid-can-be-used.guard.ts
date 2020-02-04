import { Injectable } from '@angular/core';
import { CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnboardingGiftAidService } from '../services/onboarding-giftaid.service';
import { Observable } from 'rxjs';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidCanBeUsedGuard implements CanActivate {
  constructor(private applicationStateService: ApplicationStateService, private onboardingGiftAidService: OnboardingGiftAidService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.onboardingGiftAidService.isGiftAidEligble(this.applicationStateService.currentTokenModel.OrganisationAdmin);
  }
}
