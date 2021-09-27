import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { SetLaunchDateCommand } from '../models/set-launch-date.command';


@Injectable({
    providedIn: 'root'
})
export class PreboardingCurrentLaunchDateResolver implements Resolve<SetLaunchDateCommand> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): SetLaunchDateCommand | Observable<SetLaunchDateCommand> | Promise<SetLaunchDateCommand> {
        return this.stateService.currentSetLaunchDateCommand;
    }
}
