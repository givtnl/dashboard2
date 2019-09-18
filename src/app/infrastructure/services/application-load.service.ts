import { Injectable } from '@angular/core';
import { ApplicationStateService } from './application-state.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLoadService {
  constructor(private applicationStateService: ApplicationStateService) {}

  public initializeApp() {
    if (!environment.production) {
      this.applicationStateService.currentUserModel = {
        organisationId: '0A5114B3-D21E-4615-BC1E-0853240EFBEE',
        organisationName: 'Dorcas',
        userName: 'Debug gebruiker',
        userEmail: 'Debugemail@debug.debug'
      };
    }
  }
}
