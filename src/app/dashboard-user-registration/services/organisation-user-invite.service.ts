import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CreateOrganisationUserInviteCommand } from '../models/create-organisatiion-user-invite-command.model';
import { OrganisationUserInviteDetailModel } from '../models/organisation-user-invite-detail.model';
import { OrganisationUserInviteListModel } from '../models/organisation-user-invite-list.model';
import { OrganisationUserInviteStatus } from '../models/organisation-user-invite-status.enum';

@Injectable({
    providedIn: 'root'
})
export class OrganisationUserInviteService {
    constructor(private backendService: BackendService) { }

    getAll(organisationId: string, status: OrganisationUserInviteStatus = OrganisationUserInviteStatus.Invited): Observable<OrganisationUserInviteListModel[]> {
        return this.backendService.get<OrganisationUserInviteListModel[]>(`v2/organisations/${organisationId}/users/invites?status=${status.valueOf()}`);
    }
    create(command: CreateOrganisationUserInviteCommand): Observable<OrganisationUserInviteDetailModel> {
        return this.backendService.post<OrganisationUserInviteDetailModel>(`v2/organisations/${command.organisationId}/users/invites`, command);
    }
    delete(organisationId: string, id: string): Observable<object> {
        return this.backendService.delete(`v2/organisations/${organisationId}/users/invites/${id}`);
    }
    accept(organisationId: string, id: string): Observable<object> {
        return this.backendService.patch<object>(`v2/organisations/${organisationId}/users/invites/${id}/accept`);
    }
}
