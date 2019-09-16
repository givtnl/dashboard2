import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Injectable } from '@angular/core';
import { CreateUserForCollectGroupCommand } from '../models/commands/create-user-for-collect-group.command';
import { Observable, of } from 'rxjs';
import { SendUserRegistrationEmailOnboardingCommand } from '../models/commands/send-user-registration-email-onboarding.command';
import { UserRegistrationResponseModel } from '../models/user-registration-response.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    constructor(private backendService: BackendService) {}

    prepareUser(collectGroupId: string, email: string): Observable<UserRegistrationResponseModel> {
        return this.backendService.get<UserRegistrationResponseModel>(`collectgroups/${collectGroupId}/users/register?email=${encodeURI(email)}`);
    }

    sendRegistrationMail(collectGroupId: string, command: SendUserRegistrationEmailOnboardingCommand): Observable<object> {
        return this.backendService.post(`collectgroups/${collectGroupId}/users/register`, command);
    }

    createUser(onboardingModel: CreateUserForCollectGroupCommand): Observable<object> {
        return this.backendService.post(`collectgroups/${onboardingModel.collectGroupId}/users`, onboardingModel);
    }

    addBankAccount(onboardingModel: AddBankAccountToOrganisationCommand): Observable<object> {
        return of({});
    }
}
