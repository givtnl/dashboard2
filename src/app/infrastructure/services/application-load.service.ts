import { Injectable } from '@angular/core';
import { ApplicationStateService } from './application-state.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationLoadService {
  constructor(private applicationStateService: ApplicationStateService) {}

  public initializeApp() {
  
  }
}
