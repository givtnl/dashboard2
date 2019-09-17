import { Component } from '@angular/core';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  constructor(public applicationStateService: ApplicationStateService) {}
}
