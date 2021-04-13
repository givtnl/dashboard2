import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { OrganisationsService } from "src/app/organisations/services/organisations.service";

@Injectable({
    providedIn: 'root'
}) export class RetrieveOrganisationsGuard implements CanActivate {
    constructor(private organisationsService: OrganisationsService,
        private applicationStateService: ApplicationStateService,
        private router: Router) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        const organisations = await this.organisationsService.getAll(this.applicationStateService.currentTokenModel.GUID).toPromise();
        if (organisations === null || organisations === undefined || organisations.length < 2)
            return true;
        else
            return this.router.createUrlTree(['/', 'dashboard', 'select-organisation']);
    }
}