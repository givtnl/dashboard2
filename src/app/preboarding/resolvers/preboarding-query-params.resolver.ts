import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { PreboardingDetailModel } from '../models/preboarding-detail.model';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Injectable({
    providedIn: 'root'
})
export class PreboardingQueryParamsResolver implements Resolve<PreboardingDetailModel> {
    /**
     *
     */
    constructor(private preboardingStateService: PreboardingStateService, private applicationService: ApplicationStateService) { }
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
        
        this.preboardingStateService.organisationDetails = preboardingDetails;
        this.applicationService.currentTokenModel = { access_token: preboardingDetails.token, refresh_token: null, OrganisationAdmin: null}
        return preboardingDetails;
    }
}
