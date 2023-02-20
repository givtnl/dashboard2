import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStepListModel } from '../preboarding-details-complete/models/preboarding-step-list.model';
import { PreboardingStateService } from "../services/preboarding-state.service";

@Injectable({
  providedIn: "root",
})
export class PreboardingAvailableStepsResolver
  implements Resolve<PreboardingStepListModel[]>
{
  constructor(private preboardingStateService: PreboardingStateService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | PreboardingStepListModel[]
    | Observable<PreboardingStepListModel[]>
    | Promise<PreboardingStepListModel[]> {
      const country = this.preboardingStateService.organisationDetails.country;
      let stepList = [
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-registering-in-app",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-create-collection-mediums",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-export-collection-medium",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-export-collection-medium-by-mail",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-inviting-collect-group-admins",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-adding-notes-to-teamleader",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-notify-relationships",
        },
        {
          loading: true,
          term: "PreboardingDetailsCompleteComponent.steps-update-teamleader-progress",
        },
      ];
      // remove the functionality that emails QR codes to the
      // organisation admin for US organisations
      if (country && country.toLowerCase() == "us") {
        stepList.splice(1, 3);
      }
      return stepList;
    }
}