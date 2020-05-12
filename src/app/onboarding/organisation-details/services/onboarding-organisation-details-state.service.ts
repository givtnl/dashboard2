import { Injectable } from '@angular/core';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { CurrentOrganisationRegistrationDetailsModel } from '../models/current-organisation-registration-details-model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
  }
  public get currentOrganisationCharityCommisionModel(): CharityCommisionOrganisationDetailModel {
    return JSON.parse(this.storage.getItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel'));
  }
  public set currentOrganisationCharityCommisionModel(value: CharityCommisionOrganisationDetailModel) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel', JSON.stringify(value));
  }

  public get currentCharityNumber(): string {
    return this.storage.getItem('OnboardingOrganisationDetailsStateService.CurrentCharityNumber');
  }
  public set currentCharityNumber(charityNumber: string) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.CurrentCharityNumber', charityNumber.toString());
  }
  public get currentOrganisationRegistrationDetailsModel(): CurrentOrganisationRegistrationDetailsModel {
    return JSON.parse(this.storage.getItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationRegistrationDetailsModel'));
  } 
  public set currentOrganisationRegistrationDetailsModel(value: CurrentOrganisationRegistrationDetailsModel) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationRegistrationDetailsModel', JSON.stringify(value))
  }
}
