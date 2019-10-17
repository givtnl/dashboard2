import { GetCharityDetailsFromCommisionResponseModel } from '../models/GetCharityDetailsFromCommisionResponseModel';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class OnboardingOrganisationDetailsStateService {
  private storage = sessionStorage;
  private key = 'OnboardingOrganisationDetails.currentOrganisationCharityCommisionModel';
  public clear(): void {
    this.storage.removeItem(this.key);
  }
  public get currentOrganisationCharityCommisionModel(): GetCharityDetailsFromCommisionResponseModel {
    return JSON.parse(this.storage.getItem(this.key));
  }
  public set currentOrganisationCharityCommisionModel(value: GetCharityDetailsFromCommisionResponseModel) {
    this.storage.setItem(this.key, JSON.stringify(value));
  }

  public get currentCharityNumber(): number {
    return Number(this.storage.getItem("currentCharityNumber"));
  }
  public set currentCharityNumber(charityNumber: number) {
    this.storage.setItem("currentCharityNumber", charityNumber.toString());
  }
}
