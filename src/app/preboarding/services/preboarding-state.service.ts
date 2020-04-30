import { Injectable } from '@angular/core';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { CreateOrganisationContactCommand } from 'src/app/organisations/models/commands/create-organisation-contact.command';
import { CreatePreboardingAdditionalInformationCommand } from '../models/create-preboarding-additional-information.command';
import { CreateCollectGroupUserCommand } from 'src/app/collect-groups/models/create-collect-group-user.command';
import { PreboardingDetailModel } from '../models/preboarding-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PreboardingStateService {
  private storage = sessionStorage;

  public clear(): void {
    // this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
  }

  public get currentAdditionalInformation(): CreatePreboardingAdditionalInformationCommand {
    const key = 'PreboardingStateService.currentAdditionalInformation';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || {
      candleCollection: { enabled: false },
      collectionBoxes: { enabled: false },
      communionCollection: { enabled: false },
      endOfServiceCollection: { enabled: false },
      multipleCollectionService: { enabled: false },
      singleCollectionService: { enabled: false }
    };;
  }

  public set currentAdditionalInformation(value: CreatePreboardingAdditionalInformationCommand) {
    const key = 'PreboardingStateService.currentAdditionalInformation';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get currentCollectGroupDetails(): CreateCollectGroupCommand {
    const key = 'PreboardingStateService.currentCollectGroupDetails';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || {};
  }

  public set currentCollectGroupDetails(value: CreateCollectGroupCommand) {
    const key = 'PreboardingStateService.currentCollectGroupDetails';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get currentOrganisationContact(): CreateOrganisationContactCommand {
    const key = 'PreboardingStateService.currentOrganisationContact';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || {};
  }

  public set currentOrganisationContact(value: CreateOrganisationContactCommand) {
    const key = 'PreboardingStateService.currentOrganisationContact';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get currentOrganisationAdminContact(): CreateCollectGroupUserCommand {
    const key = 'PreboardingStateService.currentOrganisationAdminContact';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || {};
  }

  public set currentOrganisationAdminContact(value: CreateCollectGroupUserCommand) {
    const key = 'PreboardingStateService.currentOrganisationAdminContact';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get organisationDetails(): PreboardingDetailModel {
    const key = 'PreboardingStateService.organisationDetails';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || null;
  }
  public set organisationDetails(value: PreboardingDetailModel) {
    const key = 'PreboardingStateService.organisationDetails';
    this.storage.setItem(key, JSON.stringify(value));
  }
}