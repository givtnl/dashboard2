import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { inject, Injectable } from '@angular/core';
import { organisationSettings } from '../models/preboarding-details-settings.model';

@Injectable({
  providedIn: 'root'
})
export class PreboardingStateService {
  private storage = sessionStorage;

  public clear(): void {
    this.storage.removeItem('OnboardingOrganisationDetailsStateService.CurrentOrganisationCharityCommisionModel');
  }

  public get validatedAndCompletedStepOne(): boolean {
    const key = 'PreboardingStateService.validatedAndCompletedStepOne';
    const serializedRequest = JSON.parse(this.storage.getItem(key));
    return serializedRequest || false;
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