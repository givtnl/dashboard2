import { Injectable } from '@angular/core';
import { organisationSettings } from '../models/preboarding-details-settings.model';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { CreateOrganisationContactCommand } from 'src/app/organisations/models/commands/create-organisation-contact.command';
import { CreatePreboardingAdditionalInformationCommand } from '../models/create-preboarding-additional-information.command';

@Injectable({
  providedIn: 'root'
})
export class PreboardingStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
  }

  public get validatedAndCompletedStepFour(): boolean {
    const key = 'PreboardingStateService.validatedAndCompletedStepFour';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || false;
  }

  public set validatedAndCompletedStepFour(value: boolean) {
    const key = 'PreboardingStateService.validatedAndCompletedStepFour';
    this.storage.setItem(key, JSON.stringify(value));
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


  public get currentOrganisationDetails(): organisationSettings {
    const key = 'PreboardingStateService.currentOrganisationDetails';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || {};
  }

  public set currentOrganisationDetails(value: organisationSettings) {
    const key = 'PreboardingStateService.currentOrganisationDetails';
    this.storage.setItem(key, JSON.stringify(value));
  }



}