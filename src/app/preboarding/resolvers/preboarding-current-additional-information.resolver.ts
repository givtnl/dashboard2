import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateCollectGroupCommand } from 'src/app/collect-groups/models/create-collect-group.command';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { CreatePreboardingAdditionalInformationCommand } from '../models/create-preboarding-additional-information.command';


@Injectable({
    providedIn: 'root'
})
export class PreboardingCurrentAdditionalInformationResolver implements Resolve<CreatePreboardingAdditionalInformationCommand> {
    /**
     *
     */
    constructor(private stateService: PreboardingStateService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): CreatePreboardingAdditionalInformationCommand | Observable<CreatePreboardingAdditionalInformationCommand> | Promise<CreatePreboardingAdditionalInformationCommand> {
        return this.stateService.currentAdditionalInformation;
    }
}
