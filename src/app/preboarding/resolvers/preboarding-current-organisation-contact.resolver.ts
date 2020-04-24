import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreateOrganisationContactCommand } from 'src/app/organisations/models/commands/create-organisation-contact.command';


@Injectable({
    providedIn: 'root'
})
export class PreboardingCurrentOrganisationContactGroupResolver implements Resolve<CreateOrganisationContactCommand> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): CreateOrganisationContactCommand | Observable<CreateOrganisationContactCommand> | Promise<CreateOrganisationContactCommand> {
        return this.stateService.currentOrganisationContact;
    }
}
