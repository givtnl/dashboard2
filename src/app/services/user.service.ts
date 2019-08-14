import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { CollectGroupAdmin } from '../onboarding-welcome/collectGroupAdmin';

@Injectable()
export class UserService {
    constructor (private backend: BackendService) {
        console.log("Creating the backendservice")
    }

    createCollectGroupAdmin(collectGroupId: String, user: CollectGroupAdmin) {
        // TODO : create the cg adming through the backendservice

        console.log("creating the collectgroupadmin")
        this.backend.post(`collectgroups/${collectGroupId}/users`, user)
    }
}