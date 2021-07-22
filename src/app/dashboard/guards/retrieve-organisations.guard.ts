import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { OrganisationsService } from "src/app/organisations/services/organisations.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Injectable({
    providedIn: 'root'
}) export class RetrieveOrganisationsGuard implements CanActivate {
    constructor(private organisationsService: OrganisationsService,
        private applicationStateService: ApplicationStateService,
        private dashboardService: DashboardService,
        private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        let organisationId: string = null;

        if (route.queryParamMap.has('organisationId'))
            organisationId = route.queryParamMap.get('organisationId');
        else if (this.dashboardService.currentOrganisation != undefined && this.dashboardService.currentOrganisation != null)
            organisationId = this.dashboardService.currentOrganisation.Id;
        
        if  (organisationId != undefined && organisationId != null) {
            var token = this.applicationStateService.currentTokenModel;
            token.OrganisationAdmin = organisationId;
            this.applicationStateService.currentTokenModel = token;
            return true;            
        }

        const organisations = await this.organisationsService.getAll(this.applicationStateService.currentTokenModel.GUID).toPromise();        
        if (organisations === null || organisations === undefined || organisations.length < 2) {
            this.dashboardService.hasMultipleOrganisations = false;
            return true;
        }
        else {
            this.dashboardService.hasMultipleOrganisations = true;
            return this.router.createUrlTree(['/', 'dashboard', 'select-organisation']);
        }
    }
}