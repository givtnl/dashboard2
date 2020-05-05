import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateCollectGroupUserCommand } from 'src/app/collect-groups/models/create-collect-group-user.command';

@Injectable({
    providedIn: 'root'
})
export class PreboardingOrganisationAdminContactResolver implements Resolve<CreateCollectGroupUserCommand[]> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): CreateCollectGroupUserCommand[] | Observable<CreateCollectGroupUserCommand[]> | Promise<CreateCollectGroupUserCommand[]> {
        return this.stateService.currentOrganisationAdminContact;
    }
}