import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompleteAccountWidgetModel } from '../models/complete-account-widget.model';

@Injectable({
    providedIn: 'root'
})
export class CompleteAccountWidgetService {
    constructor(private backendService: BackendService) {}

    get(organisationId: string): Observable<CompleteAccountWidgetModel[]> {
        return this.backendService.get<CompleteAccountWidgetModel[]>(`v2/organisations/${organisationId}`);
    }
}
