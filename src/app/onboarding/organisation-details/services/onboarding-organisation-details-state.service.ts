import { Injectable } from '@angular/core';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
  }
  public get currentOrganisationCharityCommisionModel(): OrganisationDetailModel {
    return JSON.parse(this.storage.getItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel'));
  }
  public set currentOrganisationCharityCommisionModel(value: OrganisationDetailModel) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel', JSON.stringify(value));
  }

  public get currentCharityNumber(): number {
    return +this.storage.getItem('OnboardingOrganisationDetailsStateService.CurrentCharityNumber');
  }
  public set currentCharityNumber(charityNumber: number) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.CurrentCharityNumber', charityNumber.toString());
  }
}
