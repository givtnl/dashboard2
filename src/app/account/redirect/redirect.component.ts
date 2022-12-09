import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  constructor(private applicationStateService: ApplicationStateService, private dashboardService: DashboardService) { }

  ngOnInit() {
    var redirectUrl = this.dashboardService.getOldDashboardUrl();
    var currentToken = this.applicationStateService.currentTokenModel;
    window.location.href = redirectUrl + "/#/login?access_token=" + currentToken.access_token + '&refresh_token=' + currentToken.refresh_token;
  }
}
