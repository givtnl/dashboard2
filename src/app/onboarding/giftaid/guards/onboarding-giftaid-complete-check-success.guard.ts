import { Injectable } from '@angular/core';
import { CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OnboardingGiftAidService } from '../services/onboarding-giftaid.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { HttpErrorResponse } from '@angular/common/http';
import { OnboardingGiftAidStateService } from '../services/onboarding-giftaid-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidCompleteCheckSuccessGuard implements CanActivate {
  constructor(private applicationStateService: ApplicationStateService, private onboardingGiftAidStateService: OnboardingGiftAidStateService, private onboardingGiftAidService: OnboardingGiftAidService, private router: Router) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
        const giftaidSettings = await this.onboardingGiftAidStateService.currentGiftAidSettings;
  
        await this.onboardingGiftAidService.createGiftAidSettings(this.applicationStateService.currentTokenModel.OrganisationAdmin, giftaidSettings).toPromise();
  
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          return this.HandleFailure(next);
        }
      }
      this.onboardingGiftAidStateService.clear();
      return true;
  }

  private HandleFailure(next: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/system/error-page'], {
      queryParams: next.queryParams
    });

    return false;
  }
}
