import { Injectable } from "@angular/core";
import { LegalEntity } from "src/app/onboarding/organisation-details/models/wepay-legal-entities.model";

@Injectable({
  providedIn: "root",
})
export class OnboardingOrganisationDetailsWePayStateService {
  private storage = sessionStorage;

  get currentWePayLegalEntity(): LegalEntity {
    const key = "DashboardService.CurrentLegalEntity";
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest;
  }

  set currentWePayLegalEntity(value: LegalEntity) {
    const key = "DashboardService.CurrentLegalEntity";
    this.storage.setItem(key, JSON.stringify(value));
  }
}
