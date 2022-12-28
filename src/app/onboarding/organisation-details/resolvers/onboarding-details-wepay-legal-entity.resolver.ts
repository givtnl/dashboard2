import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { LegalEntity } from '../models/wepay-legal-entities.model';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';
import { map, switchMap } from 'rxjs/operators';
import { WePayService } from 'src/app/shared/services/wepay.service';
import { OnboardingOrganisationDetailsWePayStateService } from '../services/onboarding-organisational-details-wepay-state.service';

@Injectable({
    providedIn: 'root'
})
export class OnboardingDetailsWePayLegalEntityResolver implements Resolve<LegalEntity> {
    /**
     *
     */
    constructor(private onboardingOrganisationDetailsWePayStateService: OnboardingOrganisationDetailsWePayStateService,
                private organisationsService: OrganisationsService,
                private dashboardService: DashboardService,
                private wePayService:WePayService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<LegalEntity> {
        var currentLegalEntity = this.onboardingOrganisationDetailsWePayStateService.currentWePayLegalEntity;
        if(currentLegalEntity){
            return of(currentLegalEntity);
        }
        const currentOrganisation = this.dashboardService.currentOrganisation;
        return this.organisationsService.getById(currentOrganisation.Id).pipe(
            map((org: OrganisationDetailModel)=>{return org.PaymentProviderIdentification}),
            switchMap((legalEntityId: string)=>{
                if(legalEntityId){
                    return this.wePayService.getWePayLegalEntityById(legalEntityId);
                }else{
                    return of(null)
                }
            })
        )
    }
}
