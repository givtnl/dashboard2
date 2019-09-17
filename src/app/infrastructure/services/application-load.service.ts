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
        organisationId: 'E7DE469C-D527-43D2-8FBF-79D36EC0CDBB',
        organisationName: 'Dorcas',
        userName: 'Debug gebruiker',
        userEmail: 'Debugemail@debug.debug'
      };
    }
  }
}
