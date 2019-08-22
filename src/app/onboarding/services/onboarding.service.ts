import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Injectable } from '@angular/core';
import { CreateUserForCollectGroupCommand } from '../models/commands/create-user-for-collect-group.command';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { SendUserRegistrationEmailOnboardingCommand } from '../models/commands/send-user-registration-email-onboarding.command';
import { UserRegistrationResponse } from '../models/user-registration-response.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingService {
    constructor(private backendService: BackendService) {}

    prepareUser(collectGroupId: string, email: string): Observable<UserRegistrationResponse> {
        var httpParams = new HttpParams();
        httpParams = httpParams.set('email', email);

        return this.backendService.get<UserRegistrationResponse>(`collectgroups/${collectGroupId}/users/register`, httpParams);
    }

    sendRegistrationMail(collectGroupId: string, command: SendUserRegistrationEmailOnboardingCommand): Observable<object> {
        return this.backendService.post(`collectgroups/${collectGroupId}/users/register`, command);
    }

    createUser(onboardingModel: CreateUserForCollectGroupCommand): Observable<object> {
        return this.backendService.post(`collectgroups/${onboardingModel.collectGroupId}/users`, onboardingModel);
    }
}
