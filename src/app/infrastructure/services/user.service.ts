import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private backend: BackendService) {
        console.log('Creating the backendservice');
    }


}
