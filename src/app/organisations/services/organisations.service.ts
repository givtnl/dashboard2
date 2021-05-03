import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { OrganisationDetailModel } from '../models/organisation-detail.model';
import { UpdateOrganisationCommand } from '../models/commands/update-organisation.command';
import { OrganisationRegistrationProgress } from '../models/organisation-registration-progress';
import { OrganisationRegistrationStep } from '../models/organisation-registration-step';
import { OrganisationListModel } from '../models/organisation-list.model';

@Injectable({
    providedIn: 'root'
})
export class OrganisationsService {
    constructor(private backendService: BackendService) { }

    getById(id: string): Observable<OrganisationDetailModel> {
        return this.backendService.get<OrganisationDetailModel>(`organisations/${id}`);
    }
    update(id: string, command: UpdateOrganisationCommand): Observable<object> {
        return this.backendService.put(`v2/organisations/${id}`, command);
    }

    //add contact
    addNote(id: string, title: string, contents: string): Observable<object> {
        return this.backendService.post(`v2/organisations/${id}/notes`, {
            OrganisationId: id,
            title: title,
            contents: contents
        });
    }
    //change the progress internally
    changeProgress(id: string, progress: OrganisationRegistrationProgress): Observable<object> {
        return this.backendService.patch(`v2/organisations/${id}/registration/progress/${progress}`, {});
    }

    getRegistrationStatus(id: string): Observable<OrganisationRegistrationStep[]> {
        return this.backendService.get<OrganisationRegistrationStep[]>(`v2/organisations/${id}/registration`);
    }

    getAll(userId: string): Observable<OrganisationListModel[]> {
        return this.backendService.getCached<OrganisationListModel[]>(`v2/users/${userId}/organisations`);
    }
}