import { Injectable } from '@angular/core';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { AddCharityDetailsToOrganisationCommand } from '../models/commands/add-charity-details-to-organisation.command';

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
  public set currentEditedOrganisationCharityCommisionCommand(value: AddCharityDetailsToOrganisationCommand) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.currentEditedOrganisationCharityCommisionCommand', JSON.stringify(value));
  }
  public get currentEditedOrganisationCharityCommisionCommand(): AddCharityDetailsToOrganisationCommand {
    return JSON.parse(this.storage.getItem('OnboardingOrganisationDetailsStateService.currentEditedOrganisationCharityCommisionCommand'));
  }

  public get currentCharityNumber(): number {
    return +this.storage.getItem('OnboardingOrganisationDetailsStateService.CurrentCharityNumber');
  }
  public set currentCharityNumber(charityNumber: number) {
    this.storage.setItem('OnboardingOrganisationDetailsStateService.CurrentCharityNumber', charityNumber.toString());
  }
}
