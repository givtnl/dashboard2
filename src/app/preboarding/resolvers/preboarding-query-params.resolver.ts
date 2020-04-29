import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreatePreboardingQueryParamsCommand } from '../models/create-preboarding-query-params.command';


@Injectable({
    providedIn: 'root'
})
export class PreboardingQueryParamsResolver implements Resolve<CreatePreboardingQueryParamsCommand> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): CreatePreboardingQueryParamsCommand | Observable<CreatePreboardingQueryParamsCommand> | Promise<CreatePreboardingQueryParamsCommand> {
        let preboardingDetails = {
            country: route.queryParams.country,
            type: Number(route.queryParams.type)
        };
        
        this.stateService.organisationDetails = preboardingDetails;
        return preboardingDetails;
    }
}
