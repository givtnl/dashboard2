import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { inject, Injectable } from '@angular/core';
import { organisationSettings } from '../models/preboarding-details-settings.model';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';

@Injectable({
  providedIn: 'root'
})
export class PreboardingStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
  }


  public set validatedAndCompletedStepOne(value: boolean) {
    const key = 'PreboardingStateService.validatedAndCompletedStepOne';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get validatedAndCompletedStepTwo(): boolean {
    const key = 'PreboardingStateService.validatedAndCompletedStepTwo';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || false;
  }

  public set validatedAndCompletedStepTwo(value: boolean) {
    const key = 'PreboardingStateService.validatedAndCompletedStepTwo';
    this.storage.setItem(key, JSON.stringify(value));
  }

  public get validatedAndCompletedStepThree(): boolean {
    const key = 'PreboardingStateService.validatedAndCompletedStepThree';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || false;
  }

  public set validatedAndCompletedStepThree(value: boolean) {
    const key = 'PreboardingStateService.validatedAndCompletedStepThree';
    this.storage.setItem(key, JSON.stringify(value));
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


  public get currentCollectGroupDetails(): CreateCollectGroupCommand {
    const key = 'PreboardingStateService.currentCollectGroupDetails';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || {};
  }

  public set currentCollectGroupDetails(value: CreateCollectGroupCommand) {
    const key = 'PreboardingStateService.currentCollectGroupDetails';
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