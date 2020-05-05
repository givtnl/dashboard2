import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRegistrationResponseModel } from '../models/user-registration-response.model';
import { SendUserRegistrationEmailForCollectGroupCommand } from 'src/app/collect-groups/models/send-user-registration-email-for-collect-group.command';
import { CreateUserForCollectGroupCommand } from 'src/app/collect-groups/models/create-user-for-collect-group.command';

@Injectable({
    providedIn: 'root'
})
export class OnboardingNewUsersService {
    constructor(private backendService: BackendService) { }

    prepareUser(collectGroupId: string, email: string): Observable<UserRegistrationResponseModel> {
        return this.backendService.get<UserRegistrationResponseModel>(`v2/collectgroups/${collectGroupId}/users/register?email=${encodeURIComponent(email)}`);
    }

    sendRegistrationMail(collectGroupId: string, command: SendUserRegistrationEmailForCollectGroupCommand): Observable<object> {
        return this.backendService.post(`v2/collectgroups/${collectGroupId}/users/register`, command);
    }

    createUser(onboardingModel: CreateUserForCollectGroupCommand): Observable<object> {
        return this.backendService.post(`v2/collectgroups/${onboardingModel.collectGroupId}/users`, onboardingModel);
    }
}
