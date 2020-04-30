import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { PreboardingDetailModel } from '../models/preboarding-detail.model';

@Injectable({
    providedIn: 'root'
})
export class PreboardingQueryParamsResolver implements Resolve<PreboardingDetailModel> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): PreboardingDetailModel | Observable<PreboardingDetailModel> | Promise<PreboardingDetailModel> {    
        
        let preboardingDetails:PreboardingDetailModel = {
            token: route.queryParams.token,
            organisationName: route.queryParams.organisationName,
            organisationId: route.queryParams.organisationId,
            emailAddress: route.queryParams.emailAddress,
            country: route.queryParams.country,
            type: route.queryParams.type,
            language: route.queryParams.language
        };
        
        this.stateService.organisationDetails = preboardingDetails;
        return preboardingDetails;
    }
}
