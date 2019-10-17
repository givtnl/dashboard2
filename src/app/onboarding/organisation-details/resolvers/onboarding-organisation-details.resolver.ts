import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslatableToastrService } from 'src/app/shared/services/translate-able-toastr.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Observable } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { HttpErrorResponse } from '@angular/common/http';
import { BackendService } from 'src/app/infrastructure/services/backend.service';

export class OnboardingOrganisationDetailsResolver implements Resolve<OnboardingOrganisationDetailsResponseModel>
{
    constructor(private service: OnboardingOrganisationDetailsService, 
        private toastr: TranslatableToastrService, 
        private applicationStateService: ApplicationStateService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
    | OnboardingOrganisationDetailsResponseModel
    | Observable<OnboardingOrganisationDetailsResponseModel>
    | Promise<OnboardingOrganisationDetailsResponseModel> {
        return this.service.getRegistrationStatus(this.applicationStateService.currentTokenModel.OrganisationAdmin)
        .pipe(catchErrorStatus(404, (error:HttpErrorResponse) => this.toastr.warning('errorMessages.generic-error-title','errorMessages.generic-error-message')));
    }

}

export interface OnboardingOrganisationDetailsResponseModel {
    RequiredInputs: Array<string>;
}

export class OnboardingOrganisationDetailsService {
    constructor(private backendService: BackendService) {}
    
    getRegistrationStatus(organisationId: string): Observable<OnboardingOrganisationDetailsResponseModel> {
        return this.backendService.get(`v2/organisations/${organisationId}/registration/account`);
    }
}