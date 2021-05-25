import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot} from "@angular/router";
import { OrganisationUserInviteService } from "../services/organisation-user-invite.service";
import { OrganisationUserInviteStateService } from "./organisation-user-invite-state.service";

@Injectable({
  providedIn: "root"
})
export class CreateDashboardUserGuard implements CanActivate {
    constructor(
        private stateService: OrganisationUserInviteStateService,
        private service: OrganisationUserInviteService,
        private router: Router) { }

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            await this.service
                .create(this.stateService.currentOrganisationUserInvite)
                .toPromise();
                return true;
        } catch (error) {
            return this.HandleFailure(next);
        }
    }

    private HandleFailure(next: ActivatedRouteSnapshot): boolean {
        this.router.navigate(['system','root', { outlets: { 'system-outlet': ['error'] }} ]);
        return false;
    }
}
