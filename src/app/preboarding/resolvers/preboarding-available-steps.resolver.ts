import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStepListModel } from '../preboarding-details-complete/models/preboarding-step-list.model';


@Injectable({
    providedIn: 'root'
})
export class PreboardingAvailableStepsResolver implements Resolve<PreboardingStepListModel[]> {
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): PreboardingStepListModel[] | Observable<PreboardingStepListModel[]> | Promise<PreboardingStepListModel[]> {
        return [
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-registering-in-app'
            },
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-create-collection-mediums'
            },
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-export-collection-medium'
            },
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-export-collection-medium-by-mail'
            },
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-inviting-collect-group-admins'
            },
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-adding-notes-to-teamleader'
            },
            {
                loading: true,
                term: 'PreboardingDetailsCompleteComponent.steps-update-teamleader-progress'
            }];
    }
}