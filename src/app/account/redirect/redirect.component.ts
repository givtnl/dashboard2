import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
  public redirectUrl = environment.oldDashboardUrl;

  constructor(private applicationStateService: ApplicationStateService,
    private router: Router) { }

  ngOnInit() {
    var currentToken = this.applicationStateService.currentTokenModel;
    window.location.href = this.redirectUrl + "/#/login?access_token=" + currentToken.access_token + '&refresh_token=' + currentToken.refresh_token;
  }
}
