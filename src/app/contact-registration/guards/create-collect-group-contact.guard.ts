import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CollectGroupContactsService } from "src/app/collect-group-contacts/services/collect-group-contacts.service";
import { ContactRegistrationStateService } from "src/app/contact-registration/services/contact-registration-state.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Injectable({
    providedIn: 'root'
})
export class CreateCollectGroupContactGuard implements CanActivate {
    constructor(private dashboardService: DashboardService,
        private collectGroupContactsService: CollectGroupContactsService,
        private contactRegistrationStateService: ContactRegistrationStateService,
        private router: Router) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            await this.collectGroupContactsService
                .createContact(this.dashboardService.currentCollectGroup.GUID, this.contactRegistrationStateService.currentContactRegistrationInformation)
                .toPromise();
            return true;
        } catch (error) {
            return this.HandleFailure(next);
        }
    }

    private HandleFailure(next: ActivatedRouteSnapshot): boolean {
        this.router.navigate(['/system/error-page'], {
            queryParams: next.queryParams
        });

        return false;
    }
}