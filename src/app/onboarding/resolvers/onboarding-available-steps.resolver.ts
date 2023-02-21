import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { OnboardingStepListModel } from "../organisation-details/models/onboarding-step-list.model";

@Injectable({
  providedIn: "root",
})
export class OnboardingAvailableStepsResolver
  implements Resolve<OnboardingStepListModel[]>
{
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | OnboardingStepListModel[]
    | Observable<OnboardingStepListModel[]>
    | Promise<OnboardingStepListModel[]> {
    return [
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
    ];
  }
}
