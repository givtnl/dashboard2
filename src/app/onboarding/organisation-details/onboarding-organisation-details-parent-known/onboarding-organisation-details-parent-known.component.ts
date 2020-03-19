import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

@Component({
  selector: 'app-onboarding-organisation-details-parent-known',
  templateUrl: './onboarding-organisation-details-parent-known.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-organisation-details-parent-known.component.scss']
})
export class OnboardingOrganisationDetailsParentKnownComponent implements OnInit {

  constructor(private router: Router, private applicationStateService: ApplicationStateService) { }

  private contractUrl: string;
  private initialTimeLeft: number = 6;
  public timeLeft: number = this.initialTimeLeft;
  private interval;
  public loading = false;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      else {
        this.loading = true;
        window.location.href = this.contractUrl;
      }
    }, 1000)
  }

  ngOnInit() {
    this.contractUrl =`${environment.apiUrl}/contract/organisations/${this.applicationStateService.currentTokenModel.OrganisationAdmin}`
  }

  ngAfterViewInit() {
    this.startTimer();
  }
}
