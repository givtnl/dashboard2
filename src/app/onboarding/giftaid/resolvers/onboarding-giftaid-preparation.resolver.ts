import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { OnboardingGiftAidService } from '../services/onboarding-giftaid.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidPreparationResolver implements Resolve<PreparedGiftAidSettings> {
  /**
   *
   */
  constructor(private service: OnboardingGiftAidService, private applicationStateService: ApplicationStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): PreparedGiftAidSettings | Observable<PreparedGiftAidSettings> | Promise<PreparedGiftAidSettings> {
    const currentOrganisation = this.applicationStateService.currentTokenModel.OrganisationAdmin;
    return this.service.getPreparedSettings(currentOrganisation);
  }
}
