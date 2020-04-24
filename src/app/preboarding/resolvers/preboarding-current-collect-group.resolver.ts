import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { PreboardingStateService } from '../services/preboarding-state.service';


@Injectable({
    providedIn: 'root'
})
export class PreboardingCurrentCollectGroupResolver implements Resolve<CreateCollectGroupCommand> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): CreateCollectGroupCommand | Observable<CreateCollectGroupCommand> | Promise<CreateCollectGroupCommand> {
        return this.stateService.currentCollectGroupDetails;
    }
}
