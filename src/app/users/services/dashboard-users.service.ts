import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackendService } from "src/app/infrastructure/services/backend.service";
import { DashboardUserDetailModel } from "../models/dashboard-user-detail.model";

@Injectable({
    'providedIn': 'root'
})
export class DashboardUsersService {
    constructor(private backendService: BackendService) { }

    getUsers(organisationId: string): Observable<DashboardUserDetailModel[]> {
        return this.backendService.get<DashboardUserDetailModel[]>(`v2/organisations/${organisationId}/users`);
    }
    delete(organisationId: string, userId: string): Observable<object> {
        return this.backendService.delete(`v2/organisations/${organisationId}/users/${userId}`);
    }
}