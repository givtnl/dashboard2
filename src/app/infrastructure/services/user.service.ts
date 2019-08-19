import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

import { Observable } from 'rxjs';
import { CollectGroupAdmin } from '../../onboarding/models/register-onboarding.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private backend: BackendService) {
        console.log('Creating the backendservice');
    }

    createCollectGroupAdmin(
        collectGroupId: String,
        user: CollectGroupAdmin
    ): Observable<object> {
        return this.backend.post(`collectgroups/${collectGroupId}/users`, user);
    }
}
